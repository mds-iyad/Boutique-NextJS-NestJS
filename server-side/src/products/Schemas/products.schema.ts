import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductsDocument = Product & Document;

@Schema()
export class Product {

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop({default: () => new Date().toDateString() })
  date: Date;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  details: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Product);