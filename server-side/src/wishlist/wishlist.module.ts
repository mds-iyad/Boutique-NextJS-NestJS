import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Wishlist, WishlistSchema } from './Schemas/wishlist.schema'
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../roles/roles.guard'

@Module({
  imports: [MongooseModule.forFeature([{ name: Wishlist.name, schema: WishlistSchema }])],
  controllers: [WishlistController],
  providers: [WishlistService]
})
export class WishlistModule {}
