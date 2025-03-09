import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authService from "../services/authService";
import { LoginRequest } from "../models/auth/LoginRequest";
import { UserLoginCommandResponse } from "../models/auth/UserLoginCommandResponse";
import { Alert } from "react-native";

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
      if (response.accessToken && response.accessToken.accessToken) {
        setUser(response.userName);
        setIsAuthenticated(true);
      } else {
        Alert.alert("Giriş hatası", "Geçersiz kullanıcı bilgileri");
        setIsAuthenticated(false);
      }
    } catch (error: any) {
      Alert.alert("Giriş hatası", error.message);
      setIsAuthenticated(false);
    }
  };
  const logout = async () => {
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
