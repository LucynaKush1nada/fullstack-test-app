import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderStatus, UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private eventEmitter: EventEmitter2,
  ) { }

  async create(createOrderDto: CreateOrderDto, userId: number): Promise<Order> {
    const order = this.orderRepository.create({
      ...createOrderDto,
      user: { id: userId },
    });

    const savedOrder = await this.orderRepository.save(order);

    this.eventEmitter.emit('order.created', savedOrder);

    return savedOrder;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['user'],
    });
  }

  async findByUserId(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async findById(id: number): Promise<Order | null> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async updateStatus(id: number, updateOrderStatusDto: UpdateOrderStatusDto): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.status = updateOrderStatusDto.status;
    const updatedOrder = await this.orderRepository.save(order);

    this.eventEmitter.emit('order.status.updated', updatedOrder);

    return updatedOrder;
  }

  async getOrderStatistics(): Promise<any> {
    const [totalOrders, statusStats] = await Promise.all([
      this.orderRepository.count(),
      this.orderRepository
        .createQueryBuilder('order')
        .select('order.status')
        .addSelect('COUNT(*)', 'count')
        .groupBy('order.status')
        .getRawMany(),
    ]);

    const statusCounts = statusStats.reduce((acc, stat) => {
      acc[stat.order_status] = parseInt(stat.count);
      return acc;
    }, {});

    return {
      totalOrders,
      statusBreakdown: statusCounts,
    };
  }
}
