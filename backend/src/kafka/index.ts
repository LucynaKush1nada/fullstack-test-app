export { KafkaModule } from './kafka.module';
export { KafkaService } from './kafka.service';
export { KafkaListener } from './kafka.decorator';
export type { KafkaListenerOptions } from './kafka.decorator';
export type { MessageHandler } from './kafka.service';
export type {
    OrderCreatedMessage,
    InventoryUpdatedMessage,
    KafkaMessage,
    KafkaTopics,
    BaseKafkaMessage
} from './types/kafka-messages.types';
export { KAFKA_TOPICS } from './types/kafka-messages.types'; 