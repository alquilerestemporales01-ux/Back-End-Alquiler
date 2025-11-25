import { Users } from '../Entyties/users.entity';

export interface IUserResponseDto {
  id: string;
  name: string;
  email: string;
  birthdate: Date;
  phone: string;
  address: string;
  username: string;
  createdAt: Date;
  deletedAt: Date | null;
}

export class ResponseUserDto {
  static toDTO(user: Users): IUserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      birthdate: user.birthdate,
      phone: user.phone,
      address: user.address || '',
      username: user.username,
      createdAt: user.createdAt ?? new Date(),
      deletedAt: user.deletedAt,
    };
  }

  static toDTOList(users: Users[]): IUserResponseDto[] {
    return users.map((user) => this.toDTO(user));
  }
}

export interface IUserResponseWithAdmin extends IUserResponseDto {
  password: string;
}

export class ResponseUserWithAdminDto {
  static toDTO(user: Users): IUserResponseWithAdmin {
    return {
      ...ResponseUserDto.toDTO(user),
      password: user.password,
    };
  }

  static toDTOList(users: Users[]): IUserResponseWithAdmin[] {
    return users.map((user) => this.toDTO(user));
  }
}
