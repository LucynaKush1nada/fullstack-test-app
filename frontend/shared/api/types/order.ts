import type { User } from "./user"

export enum OrderStatus {
    CREATED = 'created',
    PROCESSING = 'processing',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
}

export interface Order {
    id: number
    productName: string
    quantity: number
    status: OrderStatus
    createdAt: string
    updatedAt: string
    user: User
}

export interface CreateOrderRequest {
    productName: string
    quantity: number
}

export interface UpdateOrderStatusRequest {
    status: OrderStatus
}

export interface OrderStatistics {
    totalOrders: number
    statusBreakdown: Record<OrderStatus, number>
}