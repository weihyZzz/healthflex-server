import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, ConsoleLogger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from './../user/user.service';
import { User } from '../user/models/user.entity';
import { StudentService } from '../student/student.service';
import { Student } from '../student/models/student.entity';
import { JwtModule } from '@nestjs/jwt';
import { aliyunConfig } from 'tokenconfig';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: aliyunConfig.JWT_SECRET,
      signOptions: {
        expiresIn: 60 * 60 * 24 * 7 + 's',
      },
    }),
    TypeOrmModule.forFeature([User, Student]),
  ],
  providers: [
    JwtStrategy,
    ConsoleLogger,
    AuthService,
    AuthResolver,
    UserService,
    StudentService,
  ],
  exports: [],
})
export class AuthModule {}
