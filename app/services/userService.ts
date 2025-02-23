import axios from "axios";
import * as SecureStore from "expo-secure-store";
import API_URL from "../utils/baseUrl";
import { jwtDecode } from "jwt-decode";
import { GetUserByIdResponse } from "../models/user/GetUserByIdQueryResponse";
import apiClient from "../utils/apiClient";

const UserService = {
  getUserIdFromToken: async (): Promise<string | null> => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      if (!token) return null;
      const decodedToken: any = jwtDecode(token);
      return (
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ] || null
      );
    } catch (error) {
      console.error("Token Decode Error:", error);
      return null;
    }
  },

  getUserById: async (): Promise<GetUserByIdResponse | null> => {
    try {
      const id = await UserService.getUserIdFromToken();
      if (!id) return null;
      const token = await SecureStore.getItemAsync("accessToken");
      const response = await apiClient.get<GetUserByIdResponse>(
        `${API_URL.API_BASE_URL}/user/id?Id=${id}`,
        {
          params: { Id: id },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Get User Error:", error.message);
      return null;
    }
  },
};

export default UserService;
