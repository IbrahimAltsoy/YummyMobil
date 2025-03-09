import axios from "axios";
import * as SecureStore from "expo-secure-store";
import API_URL from "../utils/baseUrl";
import { LoginRequest } from "../models/auth/LoginRequest";
import { UserLoginCommandResponse } from "../models/auth/UserLoginCommandResponse";
import { RegisterCommandRequest } from "../models/register/RegisterCommandRequest";
import { RegisterCommandResponse } from "../models/register/RegisterCommandResponse";
import { PasswordResetCommandRequest } from "../models/auth/PasswordResetCommandRequest";
import { PasswordResetCommandResponse } from "../models/auth/PasswordResetCommandResponse";
import { Alert } from "react-native";
import apiClient from "../utils/apiClient";
import { GoogleLoginCommandRequest } from "../models/auth/GoogleLoginCommandRequest";
import i18next from "i18next";
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
      if (response.data && response.data.accessToken.accessToken) {
        await SecureStore.setItemAsync(
          "accessToken",
          response.data.accessToken.accessToken
        );
      }

      return response.data;
    } catch (error: any) {
      return {
        message: "Bir hata oluştu. Lütfen tekrar deneyin.",
        userName: "",
        accessToken: { accessToken: "", expiration: "", refreshToken: "" },
      };    
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
      Alert.alert("Error", error.message);
      return {success: false, message: "Kullanıcı Kaydı gerçekleşmedi."}
    }
  },

  logout: async () => {
    try {
      // Sadece SecureStore'dan token'ı sil
      await SecureStore.deleteItemAsync("accessToken");
      return { success: true };
    } catch (error: any) {
      Alert.alert(i18next.t("Çıkış Hatası"), error.message);
      return { success: false, message: error.message };
    }
  },
  forgotPassword: async (
    email: PasswordResetCommandRequest
  ): Promise<PasswordResetCommandResponse> => {
    try {
      const response = await apiClient.post<PasswordResetCommandResponse>(
        `${API_URL.API_BASE_URL}/Auth/password-reset`,
        email,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error: any) {
      Alert.alert("Şifre Sıfırlama", error.message);
      throw new Error(error.message);
    }
  },

  isLoggedIn: async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      return !!token; // Token varsa true, yoksa false
    } catch (error: any) {
      Alert.alert(i18next.t("Token Kontrol Hatası"), error.message);
      return false;
    }
  },

  // Kullanıcıyı Getirme (Sadece token dönecek)
  getUser: async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      return token ? token : null;
    } catch (error: any) {
      Alert.alert(i18next.t("Kullanıcı Yükleme Hatası"), error.message);
      return null;
    }
  },
  googleLogin: async (googleLoginRequest: GoogleLoginCommandRequest) => {
    try {
      const response = await apiClient.post(
        `${API_URL.API_BASE_URL}/Auth/google-login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(googleLoginRequest),
        }
      );
      if (!response.data) {
        throw new Error("Login hatası");
      }
      return await response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
