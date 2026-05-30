import { IsEmail, IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';
export class CreateClientDto {
@IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsBoolean()
  @IsOptional()
  isReferral?: boolean;

}
