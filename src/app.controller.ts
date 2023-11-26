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
    });
  }

  @Get('/find')
  async find(): Promise<User> {
    return await this.userService.find('22820297-e288-42ba-aadf-3a4062c5c3cb');
  }

  @Get('/delete')
  async del(): Promise<boolean> {
    return await this.userService.del('e7c3b2da-f36a-4cfc-9094-f1e09527d4c1');
  }
  @Get('/update')
  async update(): Promise<boolean> {
    return await this.userService.update(
      '52a53cd2-3672-49e8-bd12-d9597ac5a2e1',
      {
        tel: '18342990089',
      },
    );
  }
}
