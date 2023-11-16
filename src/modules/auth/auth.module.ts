import { ConsoleLogger, Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [],
  providers: [ConsoleLogger, AuthResolver, AuthService],
  exports: [],
})
export class AuthModule {}
