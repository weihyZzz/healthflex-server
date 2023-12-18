import { CommonEntity } from 'src/common/entities/common.entity';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Course } from 'src/modules/course/models/course.entity';
import { Organization } from 'src/modules/organization/models/organization.entity';

export enum CardType {
  TIME = 'time',
  DURATION = 'duration',
}
/**
 * 消费卡实体
 */
@Entity('card')
export class Card extends CommonEntity {
  @Column({
    comment: '名称',
    default: '',
  })
  name: string;
  @Column({
    comment: '卡类型',
    default: CardType.TIME,
  })
  @IsNotEmpty()
  type: string;
  @Column({
    comment: '上课次数',
    default: 0,
  })
  time: number;
  @Column({
    comment: '有效期',
    default: 0,
  })
  validityDay: number;
  // 关联课程
  @ManyToOne(() => Course, (course) => course.cards, {
    cascade: true,
  })
  course: Course;

  // 关联门店
  @ManyToOne(() => Organization, (org) => org.cards, {
    cascade: true,
  })
  org: Organization;
}
