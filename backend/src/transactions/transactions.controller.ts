import { Controller, Get, Post, Body,Req, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('transactions')
@UseGuards(AuthGuard('jwt'))
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto,@Req() req:any) {
    const userId=req.user.id
    return this.transactionsService.create(createTransactionDto,userId);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }


}
