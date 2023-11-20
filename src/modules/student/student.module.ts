import { Module, ConsoleLogger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './models/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [ConsoleLogger],
  exports: [],
})
export class StudentModule {}
