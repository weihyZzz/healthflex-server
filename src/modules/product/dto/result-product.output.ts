import { ObjectType } from '@nestjs/graphql';

import { createResult, createResults } from 'src/common/dto/result.type';
import { ProductType } from './product.type';

@ObjectType()
export class ProductResult extends createResult(ProductType) {}

@ObjectType()
export class ProductResults extends createResults(ProductType) {}
