import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OSSType {
  @Field({ description: '过期时间' })
  expire: string;
  @Field({ description: '策略' })
  policy: string;
  @Field({ description: '签名' })
  signature: string;
  @Field({ description: 'key' })
  accessId: string;
  @Field({ description: 'buctek域名' })
  host: string;
  @Field({ description: 'dir' })
  dir: string;
}
