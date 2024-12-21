import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authService from "../services/authService";
import { LoginRequest } from "../models/auth/LoginRequest";
import { UserLoginCommandResponse } from "../models/auth/UserLoginCommandResponse";

// AuthContext'i TypeScript'e uygun şekilde tanımlıyoruz
interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  login: (loginData: LoginRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (loginData: LoginRequest) => {
    try {
      const response: UserLoginCommandResponse = await authService.login(
        loginData
      );
      setUser(response.userName);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error("Giriş Başarısız:", error.message);
    }
  };
  const logout = async () => {
    // await AsyncStorage.removeItem("accessToken");
    // await AsyncStorage.removeItem("refreshToken");
    await authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  const checkAuthStatus = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
    setLoading(false);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthProvider };
