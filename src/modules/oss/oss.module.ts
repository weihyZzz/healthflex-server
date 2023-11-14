import { Module } from '@nestjs/common';
import { OSSService } from './oss.service';
import { OSSResolver } from './oss.resolver';

@Module({
  imports: [],
  providers: [OSSResolver, OSSService],
  exports: [],
})
export class OSSModule {}
