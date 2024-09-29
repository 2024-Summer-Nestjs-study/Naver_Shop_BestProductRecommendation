import { IsString } from 'class-validator';

export class CustomerRegistDto {
  @IsString()
  userID: string;
  @IsString()
  userPW: string;
}