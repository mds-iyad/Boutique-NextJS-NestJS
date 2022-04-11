import { Body, Controller, Get, Post, Delete, Param, Put, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/users.dto';
import { User } from './Schemas/users.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService) {
        console.log("kkkk")
    }

    @Get()
    getUsers(): Promise<User[]> {
        return this.UsersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id) {
        return this.UsersService.findOne(id)
    }

    @Post()
    createUsers(@Body() createUsersDto: CreateUsersDto, @Request() req): Promise<CreateUsersDto> {
        return this.UsersService.create(createUsersDto);
    }
    
    @Delete(':id')
    remove(@Param('id') id) {
      return this.UsersService.delete(id);
    }

    @Put(':id')
    update(@Param('id') id, @Body() Product: CreateUsersDto) {
        return this.UsersService.update(id, Product);
    }

}
