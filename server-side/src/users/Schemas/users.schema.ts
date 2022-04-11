import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/enums/role.enum';
import { Product } from 'src/products/Schemas/products.schema';
import mongoose from 'mongoose';
export type UsersDocument = User & Document;

@Schema()
export class User {
  
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({default: () => new Date() })
  date: Date;

  @Prop({default:[Role.User]})
  roles: Role[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  panier: Product;

}

export const UsersSchema = SchemaFactory.createForClass(User);