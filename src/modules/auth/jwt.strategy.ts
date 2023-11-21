import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { aliyunConfig } from 'tokenconfig';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: aliyunConfig.JWT_SECRET,
    });
  }
  async validate(user): Promise<any> {
    if (!user.id) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
