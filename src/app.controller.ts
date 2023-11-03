import { Controller, Get } from '@nestjs/common';
import { UserService } from './modules/user/user.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get('/create')
  async create(): Promise<boolean> {
    return await this.userService.create({
      name: 'alpjo',
      desc: '普通用户',
      tel: '18334331233',
      password: '123456',
      account: 'admin',
    });
  }
}
