import axios from "axios";
import * as SecureStore from "expo-secure-store";
import API_URL from "../utils/baseUrl";
import { jwtDecode } from "jwt-decode";
import { GetUserByIdResponse } from "../models/user/GetUserByIdQueryResponse";
import apiClient from "../utils/apiClient";
import { UpdateUserProfileImageCommandRequest } from "../models/user/UpdateUserProfileImageCommandRequest";
import { UpdateUserProfileImageCommandResponse } from "../models/user/UpdateUserProfileImageCommandResponse";

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
  uploadProfileImage: async (
    image: string // Dosya URI'si (örneğin, "file:///path/to/image.jpg")
  ): Promise<UpdateUserProfileImageCommandResponse> => {
    try {
      // FormData oluştur
      const formData = new FormData();

      // Dosyayı URI'den al ve FormData'ya ekle
      const file = {
        uri: image,
        name: "profile.jpg", // Dosya adı
        type: "image/jpeg", // Dosya türü
      };

      // FormData'ya dosyayı ekle
      formData.append("image", file as any); // ✅ Backend'in beklediği format

      console.log("FormData İçeriği:", formData); // ✅ Gönderilecek içeriği kontrol edelim

      // Backend'e yükleme işlemi
      const apiResponse =
        await apiClient.post<UpdateUserProfileImageCommandResponse>(
          `${API_URL.API_BASE_URL}/user/updateImage`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

      console.log("API Yanıtı:", apiResponse.data);
      return apiResponse.data;
    } catch (error) {
      console.error("Fotoğraf yüklenirken hata oluştu:", error);
      throw error;
    }
  },
};

export default UserService;
