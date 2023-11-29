import { ORG_FAIL, ORG_NOT_EXIST, SUCCESS } from 'src/common/constants/code';
import {
  OrganizationResult,
  OrganizationResults,
} from './dto/result-organization.output';
import { OrganizationType } from './dto/organization.type';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/guards/auth.guard';
import { CurUserId } from 'src/common/decorators/current-user.decorator';
import { OrganizationInput } from './dto/organization.input';
import { Result } from 'src/common/dto/result.type';
import { OrganizationService } from './organization.service';
import { PageInput } from 'src/common/dto/page.input';
import { OrgImageService } from '../orgImage/orgImage.service';

@Resolver(() => OrganizationType)
@UseGuards(GqlAuthGuard)
export class OrganizationResolver {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly orgImageService: OrgImageService,
  ) {}

  @Query(() => OrganizationResult)
  async getOrganizationInfo(
    @Args('id') id: string,
  ): Promise<OrganizationResult> {
    const result = await this.organizationService.findById(id);
    if (result) {
      return {
        code: SUCCESS,
        data: result,
        message: '获取成功',
      };
    }
    return {
      code: ORG_NOT_EXIST,
      message: '门店信息不存在',
    };
  }

  @Mutation(() => OrganizationResult)
  async commitOrganization(
    @Args('params') params: OrganizationInput,
    @CurUserId() userId: string,
    @Args('id', { nullable: true }) id?: string,
  ): Promise<Result> {
    // 根据是否传入id来判断是创建门店还是更新门店
    if (id) {
      const organization = await this.organizationService.findById(id);
      // 门店不存在
      if (!organization) {
        return {
          code: ORG_NOT_EXIST,
          message: '门店信息不存在',
        };
      }
      // 更新之前先删除，防止数据冗余
      const delRes = await this.orgImageService.deleteByOrg(id);
      if (!delRes) {
        return {
          code: ORG_FAIL,
          message: '图片删除不成功，无法更新门店信息',
        };
      }
      const res = await this.organizationService.updateById(id, {
        ...params,
        updatedBy: userId,
      });
      if (res) {
        return {
          code: SUCCESS,
          message: '更新成功',
        };
      }
    }
    // 没有传id，则是创建门店
    const res = await this.organizationService.create({
      ...params,
      createdBy: userId,
    });
    if (res) {
      return {
        code: SUCCESS,
        message: '创建成功',
      };
    }
    return {
      code: ORG_FAIL,
      message: '操作失败',
    };
  }
  @Query(() => OrganizationResults)
  async getOrganization(
    @Args('page') page: PageInput,
  ): Promise<OrganizationResults> {
    const { pageNum, pageSize } = page;
    const [results, total] = await this.organizationService.findOrganizations({
      start: (pageNum - 1) * pageSize,
      length: pageSize,
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
}
