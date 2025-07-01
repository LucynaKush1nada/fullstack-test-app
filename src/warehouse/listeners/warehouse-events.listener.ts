import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { KafkaListener } from 'src/kafka';
import { OrderCreatedMessage, KAFKA_TOPICS } from 'src/kafka/types/kafka-messages.types';
import { WarehouseService } from '../warehouse.service';
import { InventoryUpdateDto } from '../dto/inventory-update.dto';

@Injectable()
export class WarehouseEventsListener {
  constructor(private warehouseService: WarehouseService) { }

  @KafkaListener({ topic: KAFKA_TOPICS.ORDER_CREATED, groupId: 'warehouse-group' })
  async handleOrderCreated(message: OrderCreatedMessage) {
    try {
      const inventoryUpdate = {
        productName: message.productName,
        quantity: message.quantity,
      };

      const updateDto = plainToClass(InventoryUpdateDto, inventoryUpdate);
      const errors = await validate(updateDto);

      if (errors.length > 0) {
        console.error('Validation failed for inventory update:', errors);
        return;
      }

      await this.warehouseService.updateInventory(updateDto);
    } catch (error) {
      console.error('Failed to process order for inventory update:', error);
    }
  }
}
