import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WarehouseItem } from 'src/entities/warehous-item.entity';
import { Repository } from 'typeorm';
import { InventoryUpdateDto } from './dto/inventory-update.dto';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(WarehouseItem)
    private warehouseRepository: Repository<WarehouseItem>,
  ) { }

  async updateInventory(productId: number, updateDto: InventoryUpdateDto): Promise<WarehouseItem> {
    const { productName, quantity: orderQuantity } = updateDto;

    let item = await this.warehouseRepository.findOne({
      where: { id: productId },
    });

    if (!item) {
      throw new Error(`Товар "${productName}" не найден на складе`);
    }

    if (item.quantity < orderQuantity) {
      throw new BadRequestException(
        `Недостаточно товара "${productName}". Доступно: ${item.quantity}, требуется: ${orderQuantity}`
      );
    }

    item.quantity -= orderQuantity;
    const savedItem = await this.warehouseRepository.save(item);

    return savedItem;
  }

  async getInventoryItem(productId: number): Promise<WarehouseItem | null> {
    return this.warehouseRepository.findOne({
      where: { id: productId },
    });
  }

  async getAllInventory(): Promise<WarehouseItem[]> {
    return this.warehouseRepository.find();
  }
}
