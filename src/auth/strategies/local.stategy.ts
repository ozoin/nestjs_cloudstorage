import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Controller, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
@Controller('auth')

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
        usernameFiled:'email'
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Authorization failed! User does not exist?');
    }
    return user;
  }
}
