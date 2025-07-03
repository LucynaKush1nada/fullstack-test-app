import { useRuntimeConfig } from "#app";
import type { InventoryUpdateRequest, WarehouseItem } from "../types/warehouse";

export const getWarehouseInventory = async (): Promise<WarehouseItem[]> => {
    const response = await fetch(`${useRuntimeConfig().public.apiBase}/warehouse`);
    return response.json();
};

export const getWarehouseItem = async (productId: number): Promise<WarehouseItem> => {
    const response = await fetch(`${useRuntimeConfig().public.apiBase}/warehouse/${productId}`);
    return response.json();
};

export const updateInventory = async (productId: number, requestData: InventoryUpdateRequest): Promise<WarehouseItem> => {
    const response = await fetch(`${useRuntimeConfig().public.apiBase}/warehouse/${productId}`, {
        method: "PUT",
        body: JSON.stringify(requestData),
    });
    return response.json();
};