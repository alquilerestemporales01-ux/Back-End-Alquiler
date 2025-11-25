export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
  username?: string;
  role: string; // ✅ AHORA ES STRING: 'ADMIN', 'CLIENT', 'CLEANER', 'KEY_KEEPER'
  permissions: Record<string, string[]>;
  type: 'user' | 'employee';
  exp: number;
  iat?: number;
}
