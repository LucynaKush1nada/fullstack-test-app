import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'order_service',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // В продакшене false!
    }),
    AuthModule,
    OrdersModule,
    WarehouseModule
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
