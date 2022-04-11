import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from 'src/products/Schemas/products.schema';
import mongoose from 'mongoose';

export type WishlistDocument = Wishlist & Document;

@Schema()
export class Wishlist {

  @Prop()
  username: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  productId: Product;

}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);