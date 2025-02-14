export interface GetUserByIdResponse {
  userName?: string;
  name?: string;
  surname?: string;
  email?: string;
  phoneNumber?: string;
  imageUrl?: string;
  birthday?: string;
  gender?: Gender;
  isActive?: boolean;
}
export enum Gender {
  Male = 0,
  Female = 1,
  Other = 2,
}
