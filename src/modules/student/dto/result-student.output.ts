import { ObjectType } from '@nestjs/graphql';

import { StudentType } from './student.type';
import { createResult } from 'src/common/dto/result.type';

@ObjectType()
export class StudentResult extends createResult(StudentType) {}
