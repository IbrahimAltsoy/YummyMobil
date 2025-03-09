// services/feedback.service.ts

import axios from "axios";
import { CreateUserFeedbackCommandRequest } from "../models/UserFeedback/CreateUserFeedbackCommandRequest ";
import API_URL from "../utils/baseUrl";
import apiClient from "../utils/apiClient";
import { Alert } from "react-native";

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
      throw error;
    }
  }
}
