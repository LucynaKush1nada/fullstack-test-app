export interface BaseKafkaMessage {
  timestamp?: string;
  eventId?: string;
}

export interface OrderCreatedMessage extends BaseKafkaMessage {
  id: number;
  productName: string;
  quantity: number;
  userId: number;
  status: string;
  createdAt: string;
}

export interface InventoryUpdatedMessage extends BaseKafkaMessage {
  productName: string;
  previousQuantity: number;
  newQuantity: number;
  updatedAt: string;
}

export type KafkaMessage = OrderCreatedMessage | InventoryUpdatedMessage;

export const KAFKA_TOPICS = {
  ORDER_CREATED: 'order_created',
  INVENTORY_UPDATED: 'inventory_updated',
} as const;

export type KafkaTopics = typeof KAFKA_TOPICS[keyof typeof KAFKA_TOPICS]; 