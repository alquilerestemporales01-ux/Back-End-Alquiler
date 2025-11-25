import { SetMetadata, CustomDecorator } from '@nestjs/common';

export enum UserRole {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  CLEANER = 'CLEANER',
  KEY_KEEPER = 'KEY_KEEPER',
}

export const Roles = (...roles: UserRole[]): CustomDecorator<string> => SetMetadata('roles', roles);
