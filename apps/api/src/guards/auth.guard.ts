import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/routes/auth/auth.service';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true; //TODO: HANDLE LOCAL AUTHENTICATION

    try {
      const request = context.switchToHttp().getRequest();
      const sessionToken = request.cookies['sessionToken'];

      if (!sessionToken) {
        return false;
      }
      return this.authService.validateSessionToken(sessionToken);
    } catch (error) {
      return false;
    }
  }
}
