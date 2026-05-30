import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateCustomFormDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()

  fields!: any; 

  @IsString()
  @IsOptional()
  thanksMessage?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}