import { IsNumber, IsString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { TransactionType } from '@prisma/client'; // Esto viene de tu enum en Prisma

export class CreateTransactionDto {
  @IsNumber()
  amount!: number;

  @IsEnum(TransactionType)
  type!: TransactionType; 

  @IsString()
  @IsOptional()
  description?: string;

  @IsUUID()
  @IsOptional()
  clientId?: string; 
}