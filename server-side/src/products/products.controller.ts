import { Body, Controller, Get, Post, Delete, Param, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/products.dto';
import { Product } from './Schemas/products.schema';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RolesGuard } from '../roles/roles.guard';


@Controller('products')
export class ProductsController {
    constructor(private readonly ProductsService: ProductsService) {}

    @Get()
    getProducts(): Promise<Product[]> {
        return this.ProductsService.findAll();
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    createProducts(@Body() createProductsDto: CreateProductsDto): Promise<CreateProductsDto> {
        return this.ProductsService.create(createProductsDto);
    }

    @Get(':id')
    findOne(@Param('id') id) {
        return this.ProductsService.findOne(id)
    }

    @Delete(':id')
    remove(@Param('id') id) {
      return this.ProductsService.delete(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    update(@Param('id') id, @Body() Product: CreateProductsDto) {
        return this.ProductsService.update(id, Product);
    }
}
