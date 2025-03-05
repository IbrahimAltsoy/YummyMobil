export interface GoogleLoginCommandRequest {
  id: string;
  idToken: string;
  firstName: string;
  name: string;
  lastName: string;
  email: string;
  photoUrl: string;
  provider: string;
  surname?: string;
}
