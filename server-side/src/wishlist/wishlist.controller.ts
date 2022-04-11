import { Body, Controller, Get, Post, Delete, Param, Put, UseGuards, Query } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto, FindWishlistDto } from './dto/wishlist.dto';
import { Wishlist } from './Schemas/wishlist.schema';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RolesGuard } from '../roles/roles.guard';


@Controller('wishlist')
export class WishlistController {
    constructor(private readonly WishlistService: WishlistService) {}

    @Get()
    getWishlist(@Query() findWishlistDto: FindWishlistDto): Promise<Wishlist[]> {
        return this.WishlistService.findAll(findWishlistDto);
    }

    @Post()
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(Role.Admin)
    createWishlist(@Body() createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
        return this.WishlistService.create(createWishlistDto);
    }

    @Get(':id')
    findOne(@Param('id') id) {
        return this.WishlistService.findOne(id)
    }

    @Delete(':id')
    remove(@Param('id') id) {
      return this.WishlistService.delete(id);
    }

}
