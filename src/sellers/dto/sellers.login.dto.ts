import { IsString } from 'class-validator';

export class SellersLoginDto {
  @IsString()
  userID: string;
  @IsString()
  userPW: string;
}
