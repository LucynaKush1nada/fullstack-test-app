import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    @Roles('customer')
    createOrder(@Body() createOrderDto: CreateOrderDto, @Req() req) {
        return this.ordersService.create(createOrderDto, req.user.id);
    }

    @Get()
    @Roles('admin')
    getAllOrders() {
        return this.ordersService.findAll();
    }
}
