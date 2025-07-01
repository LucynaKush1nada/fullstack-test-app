import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kafka } from 'kafkajs';
import { WarehouseItem } from 'src/entities/warehous-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WarehouseService {
  private kafka = new Kafka({
    brokers: ['localhost:9092'],
  });

  constructor(
    @InjectRepository(WarehouseItem)
    private warehouseRepository: Repository<WarehouseItem>,
  ) { }

  async onModuleInit() {
    await this.setupKafkaConsumer();
  }

  private async setupKafkaConsumer() {
    const consumer = this.kafka.consumer({ groupId: 'warehouse-group' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'order_created' });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const order = JSON.parse(message.value.toString());
        await this.processOrder(order);
      },
    });
  }

  private async processOrder(order: { productName: string; quantity: number }) {
    let item = await this.warehouseRepository.findOne({
      where: { productName: order.productName },
    });

    if (!item) {
      item = this.warehouseRepository.create({
        productName: order.productName,
        quantity: 100,
      });
    }

    item.quantity -= order.quantity;
    await this.warehouseRepository.save(item);

    console.log(
      `Обновлен остаток для "${order.productName}": ${item.quantity}`,
    );
  }
}
