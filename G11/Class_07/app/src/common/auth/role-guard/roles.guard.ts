import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/interfaces/role.enum';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('ROLES ARR IN ROLE GUARD', requiredRoles); // [admin]

    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest<Request>();
    console.log('USER IN ROLE GUARD', req.user);
    return requiredRoles.some((role) => req.user['role'].includes(role)); //false; if we are admin return true
  }
}
