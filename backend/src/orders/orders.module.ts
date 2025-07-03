import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { AuthModule } from 'src/auth/auth.module';
import { OrderEventsListener } from './events/order-events.listener';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    AuthModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderEventsListener],
})
export class OrdersModule { }
