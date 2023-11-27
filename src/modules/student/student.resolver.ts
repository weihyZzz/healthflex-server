/* eslint-disable prettier/prettier */
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentType } from './dto/student.type';
import { StudentService } from './student.service';
import { UseGuards } from '@nestjs/common';
import { StudentResult } from './dto/result-student.output';
import { STUDENT_NOT_EXIST, SUCCESS } from 'src/common/constants/code';
import { StudentInput } from './dto/student.input';
import { Result } from 'src/common/dto/result.type';
import { GqlAuthGuard } from 'src/common/guards/auth.guard';

@Resolver(() => StudentType)
@UseGuards(GqlAuthGuard)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}
  @Query(() => StudentResult)
  async getStudentInfo(@Context() cxt: any): Promise<StudentResult> {
    const id = cxt.req.user.id;
    const result = await this.studentService.findById(id)
    if (result) {
      return {
        code: SUCCESS,
        data: result,
        message: '获取成功'
      }
    }
    return {
      code: STUDENT_NOT_EXIST,
      message: '用户信息不存在'
    }
  }
  @Mutation(() => StudentResult)
  async commitStudentInfo(@Args('params') params: StudentInput, @Context() cxt: any,): Promise<Result> {
    const id = cxt.req.user.id;
    const student = await this.studentService.findById(id)
    if (student) {
      const res = await this.studentService.updateById(student.id, params)
      if (res) {
        return {
          code: SUCCESS,
          message: '更新成功',
        }
      }
    }
    return {
      code: STUDENT_NOT_EXIST,
      message: '用户信息不存在',
    }
  }
}
