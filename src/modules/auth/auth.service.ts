import * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import Util, * as $Util from '@alicloud/tea-util';
import { Injectable } from '@nestjs/common';
import { getRandomCode } from 'src/utils';
import { aliyunConfig } from 'tokenconfig';
import { UserService } from '../user/user.service';
import { msgClient } from 'src/utils/msg';
import * as dayjs from 'dayjs';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  //   发送短信验证码
  async sendCodeMsg(tel: string): Promise<boolean> {
    const user = await this.userService.findByTel(tel);
    // 做验证码过期的校验
    if (user) {
      const diffTime = dayjs().diff(dayjs(user.codeCreateTimeAt));
      if (diffTime < 60 * 1000) {
        return false;
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
      // 复制代码运行请自行打印 API 的返回值
      await msgClient.sendSmsWithOptions(sendSmsRequest, runtime);
      if (user) {
        const result = await this.userService.updateCode(user.id, code);
        if (result) {
          return true;
        }
        return false;
      }
      // 如果用户不存在
      const result = await this.userService.create({
        tel,
        code,
        codeCreateTimeAt: new Date(),
      });
      if (result) {
        return true;
      }
      return false;
    } catch (error) {
      // 如有需要，请打印 error
      Util.assertAsString(error.message);
    }
  }
}
