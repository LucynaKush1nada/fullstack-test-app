import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Producer, Consumer } from 'kafkajs';
import { KafkaMessage, KafkaTopics } from './types/kafka-messages.types';

export interface MessageHandler<T extends KafkaMessage = KafkaMessage> {
  (message: T): Promise<void>;
}

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;
  private consumers: Map<string, Consumer> = new Map();
  private messageHandlers: Map<string, MessageHandler[]> = new Map();

  constructor() {
    this.kafka = new Kafka({
      brokers: ['localhost:9092'],
    });
    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async onModuleDestroy() {
    await this.producer.disconnect();

    for (const consumer of this.consumers.values()) {
      await consumer.disconnect();
    }
  }

  async sendMessage<T extends KafkaMessage>(topic: KafkaTopics, message: T) {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      });
    } catch (error) {
      throw error;
    }
  }

  async subscribeToTopic<T extends KafkaMessage>(
    topic: KafkaTopics,
    groupId: string,
    handler: MessageHandler<T>,
  ) {
    const consumerKey = `${topic}-${groupId}`;

    if (!this.consumers.has(consumerKey)) {
      const consumer = this.kafka.consumer({ groupId });
      await consumer.connect();
      await consumer.subscribe({ topic });

      await consumer.run({
        eachMessage: async ({ message }) => {
          const handlers = this.messageHandlers.get(consumerKey) || [];
          const parsedMessage = JSON.parse(message.value.toString());

          for (const handler of handlers) {
            try {
              await handler(parsedMessage);
            } catch (error) {
              console.error(
                `Error processing message in ${consumerKey}:`,
                error,
              );
            }
          }
        },
      });

      this.consumers.set(consumerKey, consumer);
      this.messageHandlers.set(consumerKey, []);
    }

    this.messageHandlers.get(consumerKey)!.push(handler);
  }
}
