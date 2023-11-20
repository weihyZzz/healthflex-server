import { ClassType, Int } from 'type-graphql';
import { Page } from './page.type';
import { Field, ObjectType } from '@nestjs/graphql';

interface IResult<T> {
  code: number;
  message: string;
  data?: T;
}

interface IResults<T> {
  code: number;
  message: string;
  data?: T[];
  page?: Page;
}

export function createResult<T>(ItemType: ClassType<T>): ClassType<IResult<T>> {
  @ObjectType()
  class Result {
    @Field(() => Int)
    code: number;
    @Field(() => String)
    message: string;
    @Field(() => ItemType, { nullable: true })
    data?: T;
  }
  return Result;
}
// export function createResults<T>(
//   ItemType: ClassType<T>,
// ): ClassType<IResult<T>> {}
@ObjectType()
export class Result {
  @Field(() => Int)
  code: number;
  @Field(() => String)
  message: string;
}
