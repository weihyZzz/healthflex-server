import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import * as $OpenApi from '@alicloud/openapi-client';
import { aliyunConfig } from 'tokenconfig';
const config = new $OpenApi.Config({
  // 必填，您的 AccessKey ID
  accessKeyId: aliyunConfig.accessKeyId,
  // 必填，您的 AccessKey Secret
  accessKeySecret: aliyunConfig.accessKeySecret,
});
// Endpoint 请参考 https://api.aliyun.com/product/Dysmsapi
config.endpoint = `dysmsapi.aliyuncs.com`;
export const msgClient = new Dysmsapi20170525(config);
