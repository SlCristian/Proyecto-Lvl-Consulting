import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}
  create(createTransactionDto: CreateTransactionDto,userId:string) {
    return this.prisma.transaction.create({
      data: {
        ...createTransactionDto,
        userId: userId, 
      },
    });
  }

  findAll() {
    return this.prisma.transaction.findMany({
      include: { client: true, user: true },
      orderBy: { createdAt: 'desc' },
    });
  }

}
