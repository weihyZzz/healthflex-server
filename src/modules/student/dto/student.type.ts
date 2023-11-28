import { Field, ObjectType } from '@nestjs/graphql';
import { CommonType } from 'src/common/dto/common.type';

/**
 * 学员
 */
@ObjectType()
export class StudentType extends CommonType {
  @Field({
    description: '昵称',
  })
  name: string;

  @Field({
    description: '手机号',
  })
  tel: string;

  @Field({
    description: '头像',
    nullable: true,
  })
  avatar: string;
}
