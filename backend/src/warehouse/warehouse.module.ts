import { Module } from '@nestjs/common';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseItem } from 'src/entities/warehous-item.entity';
import { WarehouseEventsListener } from './listeners/warehouse-events.listener';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WarehouseItem]),
    AuthModule,
  ],
  controllers: [WarehouseController],
  providers: [WarehouseService, WarehouseEventsListener],
})
export class WarehouseModule { }
