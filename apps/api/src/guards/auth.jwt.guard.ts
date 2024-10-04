import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import { extractTokenFromHeader } from 'src/utils';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,

    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

      const payload: { user: number; iat: number; exp: number } =
        await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        });
      const user = await this.userService.findByCondition({ id: payload.user });
      request['user'] = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException(
        error.message || 'session expired! Please sign In',
      );
    }
  }
}
