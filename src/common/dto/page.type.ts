import { Field, Int, ObjectType } from '@nestjs/graphql';
// page类型
@ObjectType()
export class Page {
  @Field(() => Int)
  total: number;
  @Field(() => Int)
  start?: number;
  @Field(() => Int)
  length?: number;
}
