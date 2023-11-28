import { STUDENT_NOT_EXIST, SUCCESS } from 'src/common/constants/code';
import { TempResult } from './dto/result-temp.output';
import { TempType } from './dto/temp.type';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/guards/auth.guard';
import { CurUserId } from 'src/common/decorators/current-user.decorator';
import { TempInput } from './dto/temp.input';
import { Result } from 'src/common/dto/result.type';
import { TempService } from './temp.service';

@Resolver(() => TempType)
@UseGuards(GqlAuthGuard)
export class TempResolver {
  constructor(private readonly studentService: TempService) {}

  @Query(() => TempResult)
  async getTempInfo(@CurUserId() id: string): Promise<TempResult> {
    const result = await this.studentService.findById(id);
    if (result) {
      return {
        code: SUCCESS,
        data: result,
        message: '获取成功',
      };
    }
    return {
      code: STUDENT_NOT_EXIST,
      message: '用户信息不存在',
    };
  }

  @Mutation(() => TempResult)
  async commitTempInfo(
    @Args('params') params: TempInput,
    @CurUserId() userId: string,
  ): Promise<Result> {
    const temp = await this.studentService.findById(userId);
    if (temp) {
      const res = await this.studentService.updateById(temp.id, params);
      if (res) {
        return {
          code: SUCCESS,
          message: '更新成功',
        };
      }
    }
    return {
      code: STUDENT_NOT_EXIST,
      message: '用户信息不存在',
    };
  }
}
