export interface WarehouseItem {
    id: number;
    productName: string;
    quantity: number;
}

export interface InventoryUpdateRequest {
    productName: string;
    quantity: number;
}
