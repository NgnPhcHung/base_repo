import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.['refreshToken'];
        },
      ]),
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
      ignoreExpiration: false, 
    });
  }

  async validate(req: any, payload: any) {
    console.log('Cookies received:', req.cookies);
    const refreshToken = req.cookies['refreshToken']; 
  }
}
