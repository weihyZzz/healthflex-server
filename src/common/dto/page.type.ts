import { Field, Int, ObjectType } from '@nestjs/graphql';
// page类型
@ObjectType()
export class Page {
  @Field(() => Int)
  total: number;
  @Field(() => Int)
  pageNum?: number;
  @Field(() => Int)
  pageSize?: number;
}
