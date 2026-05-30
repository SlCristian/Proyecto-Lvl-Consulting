import { IsString, IsNotEmpty, IsInt, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';


class ResourceDto {
  @IsString()
  @IsNotEmpty()
  url!: string;

  @IsString()
  @IsNotEmpty()
  publicId!: string;

  @IsString()
  @IsNotEmpty()
  format!: string;

  @IsString()
  @IsNotEmpty()
  type!: string;
}

export class CreateWebPageDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsInt()
  @IsNotEmpty()
  categoryId!: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ResourceDto)
  resources?: ResourceDto[];
}