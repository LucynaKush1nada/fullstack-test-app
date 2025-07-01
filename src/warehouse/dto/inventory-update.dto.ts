import { IsString, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

export class InventoryUpdateDto {
    @IsString()
    @IsNotEmpty()
    productName: string;

    @IsNumber()
    @IsPositive()
    quantity: number;
} 