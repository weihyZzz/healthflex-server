import { ObjectType } from '@nestjs/graphql';

import { UserType } from './user.type';
import { createResult } from 'src/common/dto/result.type';

@ObjectType()
export class UserResult extends createResult(UserType) {}
