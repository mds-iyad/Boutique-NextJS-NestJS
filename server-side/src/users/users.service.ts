import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from './Schemas/users.schema'
import { CreateUsersDto } from './dto/users.dto';
// This should be a real class/interface representing a user entity
//export type User = any;


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private usersModel: Model<UsersDocument>) {}

    async findOne(id): Promise<User | undefined> 
    {
        return (await this.usersModel.findOne({ _id: id }).populate('panier'));
    }
    async findOneByUsername(username: string): Promise<UsersDocument | undefined> 
    {
        return this.usersModel.findOne({ username: username }).populate('panier');
    }
    async create(createUsersDto: CreateUsersDto): Promise<User> 
    {
        const createdUser = new this.usersModel(createUsersDto);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> 
    {
        return this.usersModel.find().populate('panier').exec();
    }
    
    async delete(id: string) 
    {
        const deletedUser = await this.usersModel
            .findByIdAndRemove({ _id: id })
            .exec();
        return deletedUser;
    }

    async update(id: string, User: CreateUsersDto) : Promise<User> 
    {
        return this.usersModel.findByIdAndUpdate(id, User);
    }

}