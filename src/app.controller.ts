import { Controller, Get } from '@nestjs/common';
import { UserService } from './modules/user/user.service';
import { User } from './modules/user/models/user.entity';

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

  @Get('/find')
  async find(): Promise<User> {
    return await this.userService.find('22820297-e288-42ba-aadf-3a4062c5c3cb');
  }
}
