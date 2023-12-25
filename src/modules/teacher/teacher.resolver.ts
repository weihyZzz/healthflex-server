import { FindOptionsWhere, Like } from 'typeorm';
import { Teacher } from './models/teacher.entity';
import {
  COURSE_CREATE_FAIL,
  COURSE_DEL_FAIL,
  COURSE_NOT_EXIST,
  COURSE_UPDATE_FAIL,
} from './../../common/constants/code';
import { Result } from 'src/common/dto/result.type';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/guards/auth.guard';
import { SUCCESS } from 'src/common/constants/code';
import { TeacherResult, TeacherResults } from './dto/result-teacher.output';
import { TeacherInput } from './dto/teacher.input';
import { TeacherType } from './dto/teacher.type';
import { TeacherService } from './teacher.service';
import { CurUserId } from 'src/common/decorators/current-user.decorator';
import { PageInput } from 'src/common/dto/page.input';
import { CurOrgId } from 'src/common/decorators/current-org.decorator';

@Resolver(() => TeacherType)
@UseGuards(GqlAuthGuard)
export class TeacherResolver {
  constructor(private readonly teacherService: TeacherService) {}

  @Query(() => TeacherResult)
  async getTeacherInfo(@Args('id') id: string): Promise<TeacherResult> {
    const result = await this.teacherService.findById(id);
    if (result) {
      return {
        code: SUCCESS,
        data: result,
        message: '获取成功',
      };
    }
    return {
      code: COURSE_NOT_EXIST,
      message: '课程信息不存在',
    };
  }

  @Mutation(() => TeacherResult)
  async commitTeacherInfo(
    @Args('params') params: TeacherInput,
    @CurUserId() userId: string,
    @CurOrgId() orgId: string,
    @Args('id', { nullable: true }) id: string,
  ): Promise<Result> {
    if (!id) {
      const res = await this.teacherService.create({
        ...params,
        createdBy: userId,
        org: {
          id: orgId,
        },
      });
      if (res) {
        return {
          code: SUCCESS,
          message: '创建成功',
        };
      }
      return {
        code: COURSE_CREATE_FAIL,
        message: '创建失败',
      };
    }
    const teacher = await this.teacherService.findById(id);
    if (teacher) {
      const res = await this.teacherService.updateById(teacher.id, {
        ...params,
        updatedBy: userId,
      });
      if (res) {
        return {
          code: SUCCESS,
          message: '更新成功',
        };
      }
      return {
        code: COURSE_UPDATE_FAIL,
        message: '更新失败',
      };
    }
    return {
      code: COURSE_NOT_EXIST,
      message: '教师信息不存在',
    };
  }

  @Query(() => TeacherResults)
  async getTeachers(
    @Args('page') page: PageInput,
    @CurUserId() userId: string,
    @Args('name', { nullable: true }) name?: string,
  ): Promise<TeacherResults> {
    const { pageNum, pageSize } = page;
    const where: FindOptionsWhere<Teacher> = { createdBy: userId };
    if (name) {
      where.name = Like(`%${name}%`);
    }
    const [results, total] = await this.teacherService.findTeachers({
      start: (pageNum - 1) * pageSize,
      length: pageSize,
      where,
    });
    return {
      code: SUCCESS,
      data: results,
      page: {
        pageNum,
        pageSize,
        total,
      },
      message: '获取成功',
    };
  }

  @Mutation(() => Result)
  async deleteTeacher(
    @Args('id') id: string,
    @CurUserId() userId: string,
  ): Promise<Result> {
    const result = await this.teacherService.findById(id);
    if (result) {
      const delRes = await this.teacherService.deleteById(id, userId);
      if (delRes) {
        return {
          code: SUCCESS,
          message: '删除成功',
        };
      }
      return {
        code: COURSE_DEL_FAIL,
        message: '删除失败',
      };
    }
    return {
      code: COURSE_NOT_EXIST,
      message: '教师信息不存在',
    };
  }
}
