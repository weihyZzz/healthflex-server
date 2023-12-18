import { CommonType } from 'src/common/dto/common.type';
import { Field, ObjectType } from '@nestjs/graphql';
import { CourseType } from 'src/modules/course/dto/course.type';

/**
 * 学员
 */
@ObjectType('CardType')
export class CardType extends CommonType {
  @Field({
    description: 'id',
  })
  id: string;
  @Field({
    description: '名字',
  })
  name: string;
  @Field({
    description: `卡类型 
     TIME = "time",
    DURATION = "duration"`,
  })
  type: string;
  @Field({
    description: '上课次数',
  })
  time: number;
  @Field({
    description: '有效期 （天）',
  })
  validityDay: number;
  @Field(() => CourseType, {
    description: '课程',
  })
  course: CourseType;
}
