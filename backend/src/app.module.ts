import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from './clients/clients.module';
import { TransactionsModule } from './transactions/transactions.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CategoriesModule } from './categories/categories.module';
import { WebPagesModule } from './web-pages/web-pages.module';
import { CustomFormsModule } from './custom-forms/custom-forms.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule, AuthModule, ClientsModule, TransactionsModule, DashboardModule, CategoriesModule, WebPagesModule, CustomFormsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
