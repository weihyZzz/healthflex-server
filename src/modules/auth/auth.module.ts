import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, ConsoleLogger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from './../user/user.service';
import { User } from '../user/models/user.entity';
import { StudentService } from '../student/student.service';
import { Student } from '../student/models/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Student])],
  providers: [
    ConsoleLogger,
    AuthService,
    AuthResolver,
    UserService,
    StudentService,
  ],
  exports: [],
})
export class AuthModule {}
