import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
@Injectable()
export class MyGuardGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const COSTUM_API_KEY = '1122334455';

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    console.log(authHeader);
    return authHeader === COSTUM_API_KEY; // will return true or false
  }
}
