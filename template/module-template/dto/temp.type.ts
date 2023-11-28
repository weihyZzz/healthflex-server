import { Field, ObjectType } from '@nestjs/graphql';
import { CommonType } from 'src/common/dto/common.type';

/**
 * 学员
 */
@ObjectType()
export class TempType extends CommonType {
  @Field({
    description: '昵称',
    nullable: true,
  })
  name: string;

  @Field({
    description: '手机号',
    nullable: true,
  })
  tel: string;

  @Field({
    description: '头像',
    nullable: true,
  })
  avatar: string;

  @Field({
    description: '账号',
    nullable: true,
  })
  account: string;
}
