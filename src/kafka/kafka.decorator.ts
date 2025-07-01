import { SetMetadata } from '@nestjs/common';
import { KafkaTopics } from './types/kafka-messages.types';

export const KAFKA_LISTENER_METADATA = 'kafka:listener';

export interface KafkaListenerOptions {
  topic: KafkaTopics;
  groupId: string;
}

export const KafkaListener = (options: KafkaListenerOptions) =>
  SetMetadata(KAFKA_LISTENER_METADATA, options);
