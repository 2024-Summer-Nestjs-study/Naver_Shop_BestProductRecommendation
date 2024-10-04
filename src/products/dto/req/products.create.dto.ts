import { IsNumber, IsString } from 'class-validator';

export class ProductsCreateDto {
  @IsString()
  name: string;
  @IsNumber()
  stock: number;
  @IsNumber()
  price: number;
  @IsString()
  desc: string;
}
