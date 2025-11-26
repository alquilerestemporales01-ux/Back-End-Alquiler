export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
  username?: string;
  role: string;
  permissions: Record<string, string[]>;
  type: 'user' | 'employee';
  exp: number;
  iat?: number;
}
