import { Token } from "../token/Token";

export interface UserLoginCommandResponse {
  accessToken: Token;
  message: string;
  userName: string;
}
