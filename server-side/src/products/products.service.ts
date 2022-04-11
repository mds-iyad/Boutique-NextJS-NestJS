import { Injectable } from '@nestjs/common';
import { CreateProductsDto } from './dto/products.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductsDocument } from './Schemas/products.schema';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private ProductsModel: Model<ProductsDocument>) {}
    
    async create(createProductsDto: CreateProductsDto): Promise<Product> 
    {
        const createdProduct = new this.ProductsModel(createProductsDto);
        return createdProduct.save();
    }

    async findAll(): Promise<Product[]> 
    {
        return this.ProductsModel.find().exec();
    } 
    
    async findOne(id: string): Promise<Product> 
    {
        return this.ProductsModel.findOne({ _id: id }).exec();
    }
    
    async delete(id: string) 
    {
        const deletedProduct = await this.ProductsModel
            .findByIdAndRemove({ _id: id })
            .exec();
        return deletedProduct;
    }

    async update(id: number, Product: CreateProductsDto) : Promise<Product> {
        return this.ProductsModel.findByIdAndUpdate(id, Product);
    }


    private Products: Product[] = [];
    private id: number = 0;
    private date: Date;
}
