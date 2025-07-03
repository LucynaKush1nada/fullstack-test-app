import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    productName: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}