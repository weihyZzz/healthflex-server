import { NOT_EMPTY, SUCCESS, VALIDATE_ERROR } from 'src/common/constants/code';
import { Result } from 'src/common/dto/result.type';

export const getRandomCode = () => {
  const code = [];
  for (let i = 0; i < 4; i++) {
    code.push(Math.floor(Math.random() * 9));
  }
  return code.join('');
};
/**
 *
 *
 * @param {string} account
 * @param {string} password
 * @return {*}  {Result}
 */
export const accountAndPwdValidate = (
  account: string,
  password: string,
): Result => {
  if (!account || !password) {
    return {
      code: NOT_EMPTY,
      message: '账号或密码不能为空',
    };
  }
  if (!/^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,10}$/.test(account)) {
    return {
      code: VALIDATE_ERROR,
      message: '账号校验失败，格式不符合要求',
    };
  }
  return {
    code: SUCCESS,
  };
};
