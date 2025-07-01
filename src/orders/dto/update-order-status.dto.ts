import { IsEnum, IsNotEmpty } from 'class-validator';

export enum OrderStatus {
    CREATED = 'created',
    PROCESSING = 'processing',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
}

export class UpdateOrderStatusDto {
    @IsEnum(OrderStatus)
    @IsNotEmpty()
    status: OrderStatus;
} 