import { IsNumber } from 'class-validator';

export class CustomerSearchDto {
  @IsNumber()
  product_id: number;
}
