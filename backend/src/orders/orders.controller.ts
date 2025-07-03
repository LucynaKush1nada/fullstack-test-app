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
import { Role } from 'src/enums/role';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  @Roles(Role.CUSTOMER, Role.ADMIN)
  createOrder(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    return this.ordersService.create(createOrderDto, req.user.id);
  }

  @Get()
  @Roles(Role.ADMIN)
  getAllOrders() {
    return this.ordersService.findAll();
  }

  @Get('my')
  @Roles(Role.CUSTOMER)
  async getMyOrders(@Req() req) {
    return this.ordersService.findByUserId(req.user.id);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.CUSTOMER)
  async getOrderById(@Param('id') id: number, @Req() req) {
    if (isNaN(id)) {
      throw new NotFoundException('Invalid order ID');
    }

    const order = await this.ordersService.findById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (req.user.role !== Role.ADMIN && order.user.id !== req.user.id) {
      throw new ForbiddenException('Access denied');
    }

    return order;
  }

  @Put(':id/status')
  @Roles(Role.ADMIN)
  async updateOrderStatus(
    @Param('id') id: number,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    if (isNaN(id)) {
      throw new NotFoundException('Invalid order ID');
    }

    return this.ordersService.updateStatus(id, updateOrderStatusDto);
  }

  @Get('stats/overview')
  @Roles(Role.ADMIN)
  async getOrderStatistics() {
    return this.ordersService.getOrderStatistics();
  }
}
