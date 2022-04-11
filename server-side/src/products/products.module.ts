import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductsSchema } from './Schemas/products.schema'
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../roles/roles.guard'

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductsSchema }])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
