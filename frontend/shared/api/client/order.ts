import { useRuntimeConfig } from "#app";
import type {
    CreateOrderRequest,
    Order,
    UpdateOrderStatusRequest,
} from "../types/order";

export const createOrder = async (requestData: CreateOrderRequest) => {
    const response = await fetch(`${useRuntimeConfig().public.apiBase}/orders`, {
        method: "POST",
        body: JSON.stringify(requestData),
    });
    return response.json();
};

export const getAllOrders = async (): Promise<Order[]> => {
    const response = await fetch(`${useRuntimeConfig().public.apiBase}/orders`);
    return response.json();
};

export const getMyOrders = async (): Promise<Order[]> => {
    const response = await fetch(
        `${useRuntimeConfig().public.apiBase}/orders/my`
    );
    return response.json();
};

export const updateOrderStatus = async (
    orderId: string,
    requestData: UpdateOrderStatusRequest
): Promise<Order> => {
    const response = await fetch(
        `${useRuntimeConfig().public.apiBase}/orders/${orderId}`,
        {
            method: "PUT",
            body: JSON.stringify(requestData),
        }
    );
    return response.json();
};

export const getOrderById = async (orderId: number): Promise<Order> => {
    const response = await fetch(`${useRuntimeConfig().public.apiBase}/orders/${orderId}`);
    return response.json();
};

export const getOrderStatistics = async (): Promise<any> => {
    const response = await fetch(`${useRuntimeConfig().public.apiBase}/orders/stats/overview`);
    return response.json();
};
