import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(req: Request) {
    const { username, password } = req.body as any;
    console.log({ username, password });
    return { username, password };
  }
}
