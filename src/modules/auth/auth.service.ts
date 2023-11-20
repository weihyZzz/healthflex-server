import * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import Util, * as $Util from '@alicloud/tea-util';
import { Injectable } from '@nestjs/common';
import { getRandomCode } from 'src/utils';
import { aliyunConfig } from 'tokenconfig';
import { UserService } from '../user/user.service';
import { msgClient } from 'src/utils/msg';
import * as dayjs from 'dayjs';
import { Result } from 'src/common/dto/result.type';
import {
  CODE_NOT_EXPIRE,
  SUCCESS,
  UPDATE_ERROR,
} from 'src/common/constants/code';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  //   发送短信验证码
  async sendCodeMsg(tel: string): Promise<Result> {
    const user = await this.userService.findByTel(tel);
    // 禁止频繁发送验证码
    if (user) {
      const diffTime = dayjs().diff(dayjs(user.codeCreateTimeAt));
      if (diffTime < 60 * 1000) {
        return {
          code: CODE_NOT_EXPIRE,
          message: '验证码未过期',
        };
      }
    }
    const code = getRandomCode();
    const sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest({
      signName: aliyunConfig.signName,
      templateCode: aliyunConfig.templateCode,
      phoneNumbers: tel,
      templateParam: `{"code":${code}}`,
    });
    const runtime = new $Util.RuntimeOptions({});
    try {
      await msgClient.sendSmsWithOptions(sendSmsRequest, runtime);
      if (user) {
        const result = await this.userService.updateCode(user.id, code);
        if (result) {
          return {
            code: SUCCESS,
            message: '获取验证码成功',
          };
        }
        return {
          code: UPDATE_ERROR,
          message: '更新验证码失败',
        };
      }
      // 如果用户不存在
      const result = await this.userService.create({
        tel,
        code,
        codeCreateTimeAt: new Date(),
      });
      if (result) {
        return {
          code: SUCCESS,
          message: '新建用户成功',
        };
      }
      return {
        code: UPDATE_ERROR,
        message: '新建用户失败',
      };
    } catch (error) {
      // 如有需要，请打印 error
      Util.assertAsString(error.message);
    }
  }
}
