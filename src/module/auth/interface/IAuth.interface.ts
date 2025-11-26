export interface IUserAuthResponse {
  id: string;
  name: string;
  email: string;
  birthdate: Date;
  phone: string;
  username: string;
  password?: string;
}

export interface IEmployeeAuthResponse {
  id: string;
  name: string;
  email: string;
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
    username?: string;
    phone?: string;
    role: string;
  };
}

export interface GoogleUser {
  id: string;
  name: string;
  email: string;
  accessToken: string;
}
