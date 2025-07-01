import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WarehouseItem } from 'src/entities/warehous-item.entity';
import { Repository } from 'typeorm';
import { InventoryUpdateDto } from './dto/inventory-update.dto';

@Injectable()
export class WarehouseService {
  private readonly DEFAULT_INITIAL_QUANTITY = 100;

  constructor(
    @InjectRepository(WarehouseItem)
    private warehouseRepository: Repository<WarehouseItem>,
  ) { }

  async updateInventory(updateDto: InventoryUpdateDto): Promise<WarehouseItem> {
    const { productName, quantity } = updateDto;

    let item = await this.warehouseRepository.findOne({
      where: { productName },
    });

    if (!item) {
      item = this.warehouseRepository.create({
        productName,
        quantity: this.DEFAULT_INITIAL_QUANTITY,
      });
    }

    if (item.quantity < quantity) {
      throw new BadRequestException(
        `Недостаточно товара "${productName}". Доступно: ${item.quantity}, требуется: ${quantity}`
      );
    }

    item.quantity -= quantity;
    const savedItem = await this.warehouseRepository.save(item);

    return savedItem;
  }

  async getInventoryItem(productName: string): Promise<WarehouseItem | null> {
    return this.warehouseRepository.findOne({
      where: { productName },
    });
  }

  async getAllInventory(): Promise<WarehouseItem[]> {
    return this.warehouseRepository.find();
  }
}
