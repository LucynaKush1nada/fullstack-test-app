import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Kafka } from 'kafkajs';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) { }

  private kafka = new Kafka({
    brokers: ['localhost:9092'],
  });

  async create(createOrderDto: CreateOrderDto, userId: number): Promise<Order> {
    const order = this.orderRepository.create({
      ...createOrderDto,
      user: { id: userId },
    });

    const producer = this.kafka.producer();
    await producer.connect();
    await producer.send({
      topic: 'order_created',
      messages: [
        { value: JSON.stringify(order) },
      ],
    });

    return order;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }
}
