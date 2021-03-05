import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UserService } from './users/users.service';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app/app.controller';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      `mongodb+srv://NestLearnDB:NestLearnDB2021@cluster0.ooof6.mongodb.net/FinexTrainAPI?retryWrites=true&w=majority`,
    ),
    OrdersModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
