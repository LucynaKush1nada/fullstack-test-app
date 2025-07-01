import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { WarehouseService } from './warehouse.service';

@Controller('warehouse')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WarehouseController {
    constructor(private readonly warehouseService: WarehouseService) { }

    @Get()
    @Roles('admin')
    getAllInventory() {
        return this.warehouseService.getAllInventory();
    }

    @Get(':productName')
    @Roles('admin', 'customer')
    getInventoryItem(@Param('productName') productName: string) {
        return this.warehouseService.getInventoryItem(productName);
    }
}
