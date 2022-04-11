import { Injectable } from '@nestjs/common';
import { CreateWishlistDto, FindWishlistDto } from './dto/wishlist.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Wishlist, WishlistDocument } from './Schemas/wishlist.schema';

@Injectable()
export class WishlistService {
    constructor(@InjectModel(Wishlist.name) private WishlistModel: Model<WishlistDocument>) {}
    
    async create(createWishlistDto: CreateWishlistDto): Promise<Wishlist> 
    {
        // console.log(createWishlistDto)
        const createdWishlist = new this.WishlistModel(createWishlistDto);
        return createdWishlist.save();
    }

    async findAll(findWishlistDto: FindWishlistDto): Promise<Wishlist[]> 
    {
        if(findWishlistDto.username != null)
        {return this.WishlistModel.find({username:findWishlistDto.username}).populate('productId').exec();}
        else
        {return this.WishlistModel.find().exec();}
    } 
    
    async findOne(id: string): Promise<Wishlist> 
    {
        return this.WishlistModel.findOne({ _id: id }).exec();
    }
    
    async delete(id: string) 
    {
        const deletedWishlist = await this.WishlistModel
            .findByIdAndRemove({ _id: id })
            .exec();
        return deletedWishlist;
    }

}
