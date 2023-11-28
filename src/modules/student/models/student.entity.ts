import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity } from 'typeorm';

/**
 * 组件
 */
@Entity('student')
export class Student extends CommonEntity {
  @Column({
    comment: '昵称',
    default: '',
  })
  name: string;

  @Column({
    comment: '手机号',
    nullable: true,
    default: '',
  })
  tel: string;

  @Column({
    comment: '头像',
    nullable: true,
    default: '',
  })
  avatar: string;

  @Column({
    comment: '密码',
  })
  password: string;

  @Column({
    comment: '账户',
  })
  account: string;
}
