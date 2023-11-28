import { ObjectType } from '@nestjs/graphql';

import { StudentType } from './student.type';
import { createResult, createResults } from 'src/common/dto/result.type';

@ObjectType()
export class StudentResult extends createResult(StudentType) {}
@ObjectType()
export class StudentResults extends createResults(StudentType) {}
