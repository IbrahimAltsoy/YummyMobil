import axios from "axios";
import * as SecureStore from "expo-secure-store";
import API_URL from "../utils/baseUrl";
import { LoginRequest } from "../models/auth/LoginRequest";
import { UserLoginCommandResponse } from "../models/auth/UserLoginCommandResponse";
import { RegisterCommandRequest } from "../models/register/RegisterCommandRequest";
import { RegisterCommandResponse } from "../models/register/RegisterCommandResponse";
import { Alert } from "react-native";
import apiClient from "../utils/apiClient";

const authService = {
  login: async (loginData: LoginRequest): Promise<UserLoginCommandResponse> => {
    try {
      const response = await apiClient.post<UserLoginCommandResponse>(
        `${API_URL.API_BASE_URL}/Auth/login`,
        loginData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Access Token kontrolü ve SecureStore'a kaydetme
      if (response.data && response.data.accessToken.accessToken) {
        await SecureStore.setItemAsync(
          "accessToken",
          response.data.accessToken.accessToken
        );
        // await SecureStore.deleteItemAsync("accessToken");
      }

      return response.data;
    } catch (error: any) {
      console.error("Login Error:", error.message);
      throw new Error(error.message);
    }
  },

  register: async (
    registerData: RegisterCommandRequest
  ): Promise<RegisterCommandResponse> => {
    try {
      const response = await apiClient.post<RegisterCommandResponse>(
        `${API_URL.API_BASE_URL}/Auth/register`,
        registerData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        Alert.alert("Başarılı", `${response.data.message}`);
      } else {
        Alert.alert("Başarısız", `${response.data.message}`);
      }

      return response.data;
    } catch (error: any) {
      console.error("Registration Error:", error.message);
      throw new Error(error.message);
    }
  },

  logout: async () => {
    try {
      // Sadece SecureStore'dan token'ı sil
      await SecureStore.deleteItemAsync("accessToken");
      Alert.alert("Başarılı", "Çıkış yapıldı.");
      return { success: true };
    } catch (error: any) {
      console.error("Logout Error:", error.message);
      return { success: false, message: error.message };
    }
  },

  // Oturum Durumu Kontrolü
  isLoggedIn: async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      return !!token; // Token varsa true, yoksa false
    } catch (error: any) {
      console.error("Token Check Error:", error.message);
      return false;
    }
  },

  // Kullanıcıyı Getirme (Sadece token dönecek)
  getUser: async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      return token ? token : null;
    } catch (error: any) {
      console.error("Get User Error:", error.message);
      return null;
    }
  },
};

export default authService;
