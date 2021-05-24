import {Controller, Post, Body, Get, Param, Patch, Delete} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service'

@ApiTags('users')
@Controller('users')
export class UsersController{

constructor(private readonly usersService:UsersService){}

    @Post()
    async addUser(
        @Body('username')     userName:string,
        @Body('phoneNumber')  phoneNumber:string,
        @Body('password')     password:string,
        @Body('address')      address:string,
        @Body('dateOfBirth')  dateOfBirth:string,
        @Body('age')          age:number, 
        @Body('gender')       gender:string,   
        ) {
        
        const generatedId = await this.usersService.insertUser(userName, phoneNumber, password, address, dateOfBirth, age, gender);
        return {statusCode:201,userId: generatedId,message:"Created Successfully !"}
    }  
    
    @Get() 
     async getAllUsers(){
        const users = await this.usersService.getUsers();
        return users;  
    }

    @Get(':id')
    getUser(
        @Param('id') userId:string
        ){
        // console.log("success",userId)
        return this.usersService.getSingleUser(userId);
    }
    
    @Patch(':id')
    async updateUser(
        @Param('id') userId:string,
        @Body('username') username:string,
        @Body('password') password:string,
        @Body('phoneNumber') phoneNumber:string, 
        @Body('address') address:string, 
        @Body('dateOfBirth') dateOfBirth:string, 
        @Body('age') age: number, 
        @Body('gender') gender:string
      ){
        await this.usersService.updateUser(userId, username, phoneNumber, password, address,  dateOfBirth, age, gender)
        return {result:"updated successfully"
      }
    }

    @Delete(':id')
    async removeUser(
        @Param('id') userId:string
    ){
       await this.usersService.removeUser(userId);
        return {result:"deleted successfully"}; 

    }
}