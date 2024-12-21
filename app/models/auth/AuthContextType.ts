import { LoginRequest } from "./LoginRequest";

export interface AuthContextType {
  isLoggedIn: boolean;
  user: string | null;
  login: (loginData: LoginRequest) => void;
  logout: () => void;
}
