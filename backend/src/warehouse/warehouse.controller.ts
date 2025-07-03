import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { WarehouseService } from './warehouse.service';
import { InventoryUpdateDto } from './dto/inventory-update.dto';
import { Role } from 'src/enums/role';

@Controller('warehouse')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WarehouseController {
    constructor(private readonly warehouseService: WarehouseService) { }

    @Get()
    @Roles(Role.ADMIN)
    getAllInventory() {
        return this.warehouseService.getAllInventory();
    }

    @Get(':productId')
    @Roles(Role.ADMIN, Role.CUSTOMER)
    getInventoryItem(@Param('productId') productId: number) {
        return this.warehouseService.getInventoryItem(productId);
    }

    @Put(':productId')
    @Roles(Role.ADMIN)
    updateInventory(@Param('productId') productId: number, @Body() updateDto: InventoryUpdateDto) {
        return this.warehouseService.updateInventory(productId, updateDto);
    }
}
