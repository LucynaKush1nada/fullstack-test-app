import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Order } from 'src/entities/order.entity';
import { KafkaService } from 'src/kafka';
import { OrderCreatedMessage, KAFKA_TOPICS } from 'src/kafka/types/kafka-messages.types';

@Injectable()
export class OrderEventsListener {
  constructor(private kafkaService: KafkaService) { }

  @OnEvent('order.created')
  async handleOrderCreated(order: Order) {
    try {
      const orderMessage: OrderCreatedMessage = {
        id: order.id,
        productName: order.productName,
        quantity: order.quantity,
        userId: order.user.id,
        status: order.status,
        createdAt: order.createdAt.toISOString(),
        timestamp: new Date().toISOString(),
        eventId: `order-${order.id}-${Date.now()}`,
      };

      await this.kafkaService.sendMessage(KAFKA_TOPICS.ORDER_CREATED, orderMessage);
    } catch (error) {
      console.error('Failed to send order event to Kafka:', error);
    }
  }
}
