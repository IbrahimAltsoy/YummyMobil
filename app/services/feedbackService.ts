// services/feedback.service.ts

import axios from "axios";
import { CreateUserFeedbackCommandRequest } from "../models/UserFeedback/CreateUserFeedbackCommandRequest ";
import API_URL from "../utils/baseUrl";
import apiClient from "../utils/apiClient";

export class FeedbackService {
  public async createUserFeedback(
    feedback: CreateUserFeedbackCommandRequest
  ): Promise<any> {
    try {
      const response = await apiClient.post(
        `${API_URL.API_BASE_URL}/UserFeedBack`,
        feedback,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error mesajı:", error.message);
        console.error("Response data:", error.response?.data);
        console.error("Response status:", error.response?.status);
      } else {
        console.error("Beklenmeyen hata:", error);
      }
      throw error;
    }
  }
}
