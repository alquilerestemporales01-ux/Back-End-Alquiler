export interface IUserAuthResponse {
  id: string;
  name: string;
  email: string;
  birthdate: Date;
  address: string;
  phone: string;
  username: string;
  password?: string;
}

export interface AuthResponse {
  accessToken: string;
  expiresIn: number;
  user: {
    id: string;
    name: string;
    email: string;
    birthdate?: Date;
    address: string;
    username?: string;
    phone?: string;
  };
}

export interface GoogleUser {
  id: string;
  name: string;
  email: string;
  accessToken: string;
}
