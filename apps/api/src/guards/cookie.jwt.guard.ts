import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthService } from 'src/modules/auth/auth.service';
@Injectable()
export class CookieJwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.header['next-auth.csrf-token']; 
    console.log('-------------', token);

    if (!token) {
      throw new UnauthorizedException('No token provided in cookies');
    }

    if (this.validateToken(token)) {
      return true;
    } else {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async validateToken(token: string): Promise<boolean> {
    const { user } = this.jwtService.verify(token, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    });
    console.log(user);
    // const asd  = await this.authService.validateRefreshToken
    return true; // Replace this with actual validation
  }
}
