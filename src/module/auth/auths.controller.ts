// src/modules/auths/auths.controller.ts
import { Body, Controller, Get, Post, Req, Res, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

import { AuthsService } from './auths.service';
import { AuthExceptionFilter } from './validate/auth.filter';
import { AuthResponse, GoogleUser } from './interface/IAuth.interface';
import { CreateUserDto, LoginUserDto } from '../users/Dtos/CreateUserDto';
import { ResponseUserDto } from '../users/interface/IUserResponseDto';

interface AuthenticatedRequest extends Request {
  user: GoogleUser;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthsController {
  constructor(
    private readonly authService: AuthsService,
    private readonly configService: ConfigService,
  ) {}

  // ============================================
  // LOGIN DE USUARIO (Cliente)
  // ============================================
  @ApiOperation({ summary: 'Sign in user' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: 200,
    description: 'User signed in successfully',
  })
  @Post('signin')
  async signin(@Body() credentials: LoginUserDto): Promise<AuthResponse> {
    const { email, password } = credentials;
    return await this.authService.signin(email, password);
  }

  // ============================================
  // ✅ NUEVO: LOGIN DE EMPLEADO
  // ============================================
  @ApiOperation({ summary: 'Sign in employee (Admin, Cleaner, KeyKeeper)' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: 200,
    description: 'Employee signed in successfully',
  })
  @Post('employee/signin')
  async signinEmployee(@Body() credentials: LoginUserDto): Promise<AuthResponse> {
    const { email, password } = credentials;
    return await this.authService.signinEmployee(email, password);
  }

  // ============================================
  // REGISTRO DE USUARIO
  // ============================================
  @ApiOperation({ summary: 'Sign up new user' })
  @ApiBody({ type: CreateUserDto })
  @Post('signup')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async signup(@Body() newUser: CreateUserDto): Promise<ResponseUserDto> {
    return await this.authService.signup(newUser);
  }

  // ============================================
  // GOOGLE AUTH
  // ============================================
  @ApiOperation({ summary: 'Initiate Google OAuth authentication' })
  @UseGuards(PassportAuthGuard('google'))
  @Get('google')
  async googleAuth(): Promise<void> {
    // PassportAuthGuard maneja esto
  }

  @ApiOperation({ summary: 'Google OAuth callback handler' })
  @UseFilters(AuthExceptionFilter)
  @UseGuards(PassportAuthGuard('google'))
  @Get('google/callback')
  async googleAuthRedirect(@Req() req: AuthenticatedRequest, @Res() res: Response): Promise<void> {
    const googleUser = req.user;
    const frontendUrl = this.configService.get<string>('GoogleOAuth.frontendUrl');

    const result = await this.authService.googleLogin(googleUser);
    res.redirect(`${frontendUrl}/auth/callback?token=${result.accessToken}&userId=${result.user.id}`);
  }
}
