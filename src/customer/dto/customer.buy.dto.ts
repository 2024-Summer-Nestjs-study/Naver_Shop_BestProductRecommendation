import { IsNumber } from 'class-validator';

export class CustomerBuyDto {
  @IsNumber()
  product_id: number;
}
