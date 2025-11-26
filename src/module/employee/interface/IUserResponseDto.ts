import { Employee } from '../entities/employee.entity';

export interface IEmployeeResponseDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  createdAt: Date;
  deletedAt: Date | null;
}

export interface AuthenticatedRequest extends Request {
  user: {
    sub: string;
    email: string;
    role: string;
  };
}

export class ResponseEmployeeDto {
  static toDTO(user: Employee): IEmployeeResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role?.name || 'CLIENT',
      createdAt: user.createdAt ?? new Date(),
      deletedAt: user.deletedAt,
    };
  }

  static toDTOList(users: Employee[]): IEmployeeResponseDto[] {
    return users.map((user) => this.toDTO(user));
  }
}

export interface IEmployeeResponseWithAdmin extends IEmployeeResponseDto {
  password: string;
}

export class ResponseEmployeeWithAdminDto {
  static toDTO(user: Employee): IEmployeeResponseWithAdmin {
    return {
      ...ResponseEmployeeDto.toDTO(user),
      password: user.password,
    };
  }

  static toDTOList(users: Employee[]): IEmployeeResponseWithAdmin[] {
    return users.map((user) => this.toDTO(user));
  }
}
