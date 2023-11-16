import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import * as $OpenApi from '@alicloud/openapi-client';
import Util, * as $Util from '@alicloud/tea-util';
import { Injectable } from '@nestjs/common';
import { getRandomCode } from 'src/utils';
import { aliyunConfig } from 'tokenconfig';
@Injectable()
export class AuthService {
  //   发送短信验证码
  async sendCodeMsg(tel: string): Promise<string> {
    const code = getRandomCode();
    const config = new $OpenApi.Config({
      // 必填，您的 AccessKey ID
      accessKeyId: aliyunConfig.accessKeyId,
      // 必填，您的 AccessKey Secret
      accessKeySecret: aliyunConfig.accessKeySecret,
    });
    // Endpoint 请参考 https://api.aliyun.com/product/Dysmsapi
    config.endpoint = `dysmsapi.aliyuncs.com`;
    console.log('tel:', tel);
    const client = new Dysmsapi20170525(config);
    const sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest({
      signName: aliyunConfig.signName,
      templateCode: aliyunConfig.templateCode,
      phoneNumbers: tel,
      templateParam: `{"code":${code}}`,
    });
    const runtime = new $Util.RuntimeOptions({});
    try {
      // 复制代码运行请自行打印 API 的返回值
      await client.sendSmsWithOptions(sendSmsRequest, runtime);
    } catch (error) {
      // 如有需要，请打印 error
      Util.assertAsString(error.message);
    }
    return code;
  }
}
