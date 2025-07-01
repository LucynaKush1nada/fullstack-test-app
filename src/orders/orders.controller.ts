import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  @Roles('customer', 'admin')
  createOrder(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    return this.ordersService.create(createOrderDto, req.user.id);
  }

  @Get()
  @Roles('admin')
  getAllOrders() {
    return this.ordersService.findAll();
  }

  @Get('my')
  @Roles('customer')
  async getMyOrders(@Req() req) {
    return this.ordersService.findByUserId(req.user.id);
  }

  @Get(':id')
  @Roles('admin', 'customer')
  async getOrderById(@Param('id') id: string, @Req() req) {
    const orderId = parseInt(id, 10);
    if (isNaN(orderId)) {
      throw new NotFoundException('Invalid order ID');
    }

    const order = await this.ordersService.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (req.user.role !== 'admin' && order.user.id !== req.user.id) {
      throw new ForbiddenException('Access denied');
    }

    return order;
  }

  @Put(':id/status')
  @Roles('admin')
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    const orderId = parseInt(id, 10);
    if (isNaN(orderId)) {
      throw new NotFoundException('Invalid order ID');
    }

    return this.ordersService.updateStatus(orderId, updateOrderStatusDto);
  }

  @Get('stats/overview')
  @Roles('admin')
  async getOrderStatistics() {
    return this.ordersService.getOrderStatistics();
  }
}
