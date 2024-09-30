import { IsString } from 'class-validator';

export class CustomerLoginDto {
  @IsString()
  userID: string;
  @IsString()
  userPW: string;
}
