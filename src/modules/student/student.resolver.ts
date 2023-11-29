/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentType } from './dto/student.type';
import { StudentService } from './student.service';
import { UseGuards } from '@nestjs/common';
import { StudentResult, StudentResults } from './dto/result-student.output';
import { STUDENT_NOT_EXIST, SUCCESS } from 'src/common/constants/code';
import { StudentInput } from './dto/student.input';
import { Result } from 'src/common/dto/result.type';
import { GqlAuthGuard } from 'src/common/guards/auth.guard';
import { CurUserId } from 'src/common/decorators/current-user.decorator';
import { PageInput } from 'src/common/dto/page.input';

@Resolver(() => StudentType)
@UseGuards(GqlAuthGuard)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}
  @Query(() => StudentResult)
  async getStudentInfo(@CurUserId() id: string): Promise<StudentResult> {
    const result = await this.studentService.findById(id)
    if (result) {
      return {
        code: SUCCESS,
        data: result,
        message: '获取成功',
      }
    }
    return {
      code: STUDENT_NOT_EXIST,
      message: '用户信息不存在'
    }
  }
  @Mutation(() => StudentResult)
  async commitStudentInfo(@Args('params') params: StudentInput, @CurUserId() id: string,): Promise<Result> {
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
  @Query(() => StudentResults)
  async getStudents(@Args('page') page: PageInput): Promise<StudentResults> {
    const { pageNum, pageSize } = page;
    const [ results, total ] = await this.studentService.findStudents({
      start: (pageNum - 1) * pageSize,
      length: pageSize,
    })
    return {
      code: SUCCESS,
      data: results,
      message: '获取成功',
      page: {
        pageNum,
        pageSize,
        total,
      }
    }
  }
}
