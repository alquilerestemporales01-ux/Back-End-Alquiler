import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guards';
import { UserRole } from 'src/decorator/role.decorator';
import { AuthRequest } from 'src/common/auth/auth-request.interface';

@Injectable()
export class RoleGuard extends AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    jwtService: JwtService,
  ) {
    super(jwtService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context);
    if (!canActivate) return false;
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());

    if (!roles || roles.length === 0) {
      return true;
    }

    // 3. Obtener usuario del request
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const user = request.user;

    // 4. ✅ VERIFICAR ROL DESDE EL JWT
    const hasRequiredRole = roles.some((role) => user.role === role);

    // 5. Si no tiene el rol, rechazar
    if (!hasRequiredRole) {
      throw new ForbiddenException(
        `Access restricted. This action requires one of the following roles: ${roles.join(', ')}. ` +
          `Your role: ${user.role}`,
      );
    }

    return true;
  }
}
