import { IsString } from 'class-validator';

export class SellersRegistDto {
  @IsString()
  name: string;
  @IsString()
  userID: string;
  @IsString()
  userPW: string;
}
