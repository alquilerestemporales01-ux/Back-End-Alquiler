// src/modules/auths/auths.service.ts
import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../users/Entyties/users.entity';

import { AuthValidations } from './validate/auth.validate';
import { Employee } from '../employee/entities/employee.entity';
import { Role } from '../roles/entities/role.entity';
import { AuthResponse, GoogleUser } from './interface/IAuth.interface';
import { CreateUserDto } from '../users/Dtos/CreateUserDto';
import { ResponseUserDto } from '../users/interface/IUserResponseDto';

@Injectable()
export class AuthsService {
  private readonly logger = new Logger(AuthsService.name);

  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly jwtService: JwtService,
  ) {}

  async signin(email: string, password: string): Promise<AuthResponse> {
    AuthValidations.validateCredentials(email, password);

    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['role'],
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    AuthValidations.validateUserHasPassword(user);
    await AuthValidations.validatePassword(password, user.password);

    this.logger.log(`Usuario ${email} ha iniciado sesión exitosamente`);

    return this.generateAuthResponse(user, 'user');
  }

  async signinEmployee(email: string, password: string): Promise<AuthResponse> {
    AuthValidations.validateCredentials(email, password);

    const employee = await this.employeeRepository.findOne({
      where: { email },
      relations: ['role'],
    });

    if (!employee) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    await AuthValidations.validatePassword(password, employee.password);

    this.logger.log(`Empleado ${email} ha iniciado sesión exitosamente`);

    return this.generateAuthResponse(employee, 'employee');
  }

  async signup(data: CreateUserDto): Promise<ResponseUserDto> {
    const { password, confirmPassword, ...userData } = data;

    AuthValidations.validatePasswordMatch(password, confirmPassword);

    const existingEmailUser = await this.usersRepository.findOne({
      where: { email: userData.email },
    });
    AuthValidations.validateEmailIsNotTaken(existingEmailUser?.email);

    const existingUsernameUser = await this.usersRepository.findOne({
      where: { username: userData.username },
    });
    if (existingUsernameUser) {
      AuthValidations.validateUserNameExist(userData.username, existingUsernameUser);
    }

    try {
      let clientRole = await this.roleRepository.findOne({
        where: { name: 'CLIENT' },
      });

      if (!clientRole) {
        clientRole = await this.roleRepository.save({
          name: 'CLIENT',
          description: 'Cliente que reserva propiedades',
          permissions: {
            bookings: ['create', 'read'],
            reviews: ['create', 'read'],
          },
        });
      }

      const hashedPassword = await AuthValidations.hashPassword(password);

      const newUser = this.usersRepository.create({
        ...userData,
        password: hashedPassword,
        role: clientRole,
      });

      const savedUser = await this.usersRepository.save(newUser);

      this.logger.log(`Usuario registrado exitosamente: ${savedUser.email}`);

      return ResponseUserDto.toDTO(savedUser);
    } catch (error) {
      AuthValidations.handleSignupError(error);
    }
  }

  async googleLogin(googleUser: GoogleUser): Promise<AuthResponse> {
    this.validateGoogleUser(googleUser);

    const existingUser = await this.usersRepository.findOne({
      where: { email: googleUser.email },
      relations: ['role'],
    });

    let authenticatedUser: Users;
    let isNewUser = false;

    if (!existingUser) {
      authenticatedUser = await this.createUserFromGoogleProfile(googleUser);
      isNewUser = true;
    } else {
      authenticatedUser = existingUser;
    }

    if (isNewUser) {
      this.logger.log(`Nuevo usuario creado via Google OAuth: ${googleUser.email}`);
    } else {
      this.logger.log(`Usuario existente autenticado via Google OAuth: ${googleUser.email}`);
    }

    return this.generateAuthResponse(authenticatedUser, 'user');
  }

  private async createUserFromGoogleProfile(googleUser: GoogleUser): Promise<Users> {
    const randomPassword = await AuthValidations.generateRandomPassword();
    const username = AuthValidations.generateUsernameFromEmail(googleUser.email);

    // Buscar o crear rol CLIENT
    let clientRole = await this.roleRepository.findOne({
      where: { name: 'CLIENT' },
    });

    if (!clientRole) {
      clientRole = await this.roleRepository.save({
        name: 'CLIENT',
        description: 'Cliente que reserva propiedades',
        permissions: {
          bookings: ['create', 'read'],
          reviews: ['create', 'read'],
        },
      });
    }

    const createdUser = this.usersRepository.create({
      name: googleUser.name,
      email: googleUser.email,
      birthdate: new Date().toISOString().split('T')[0],
      username,
      password: randomPassword,
      phone: '+10000000000',
      role: clientRole, // ✅ Asignar rol
    });

    const savedUser = await this.usersRepository.save(createdUser);

    this.logger.log(`Usuario creado via Google OAuth: ${googleUser.email}`);

    return savedUser;
  }

  // ============================================
  // GENERAR RESPUESTA DE AUTENTICACIÓN
  // ============================================
  private generateAuthResponse(entity: Users | Employee, type: 'user' | 'employee'): AuthResponse {
    const payload = {
      sub: entity.id,
      email: entity.email,
      name: entity.name,
      role: entity.role?.name || 'CLIENT', // ✅ ROL desde la entidad
      permissions: entity.role?.permissions || {},
      type, // 'user' o 'employee'
    };

    // Si es usuario, agregar más campos
    if (type === 'user') {
      const user = entity as Users;
      payload['username'] = user.username;
    }

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      expiresIn: 3600,
      user: {
        id: entity.id,
        name: entity.name,
        email: entity.email,
        role: entity.role?.name || 'CLIENT',
        username: type === 'user' ? (entity as Users).username : undefined,
        phone: entity.phone,
        birthdate: type === 'user' ? (entity as Users).birthdate : undefined,
      },
    };
  }

  private validateGoogleUser(googleUser: GoogleUser): void {
    if (!googleUser?.email) {
      throw new BadRequestException('Email required for authentication with Google');
    }
  }
}
