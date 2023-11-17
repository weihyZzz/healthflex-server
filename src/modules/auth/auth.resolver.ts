import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Mutation(() => Boolean, { description: '发送短信验证码' })
  async sendCodeMsg(@Args('tel') tel: string): Promise<boolean> {
    return await this.authService.sendCodeMsg(tel);
  }
}
