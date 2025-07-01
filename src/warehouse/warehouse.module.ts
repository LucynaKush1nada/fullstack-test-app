import { Module } from '@nestjs/common';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseItem } from 'src/entities/warehous-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WarehouseItem])],
  controllers: [WarehouseController],
  providers: [WarehouseService],
})
export class WarehouseModule { }
