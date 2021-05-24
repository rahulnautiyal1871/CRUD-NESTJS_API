import {Injectable, NotFoundException} from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';



@Injectable()
export class UsersService{
    private users: User[] = [];
    public saltOrRounds = 10;  

    
   constructor(@InjectModel('User') private readonly userModel:Model<User>){}
    
    // function for create-new-user
    async insertUser( username: string, phoneNumber: string, password: string,address: string, dateOfBirth: string, age: number, gender:string){
        const hashPassword = await bcrypt.hash(password, this.saltOrRounds);
        const user = await this.userModel.findOne({username:username});
        if(user){
            throw new NotFoundException('This username already registerd .');  
        }
        const newUser = new this.userModel({
            username:username, 
            phoneNumber:phoneNumber, 
            password:hashPassword, 
            address:address, 
            dateOfBirth:dateOfBirth, 
            age:age,  
            gender:gender
        })
        const result= await newUser.save();
        console.log("hello 123",newUser)
        return result.id;
    } 
    
    // find-all-users
    async getUsers(){
        const allUserData = await this.userModel.find().exec();
        return allUserData as User[];
    }
    
    // get-single-user-data
    async getSingleUser(userId:string){
        const user = await this.findUser(userId);
        return user;
    }

      // get-single-user-data
      async findOne(username:string,password:string){
        // const hashPassword = await bcrypt.compare(password,);
        const user = await this.userModel.findOne({username:username});
        if(!user){
            throw new NotFoundException('Could not find user.');  
        }
        const hashPassword = await bcrypt.compare(password,user.password);
     
        if(hashPassword==true){
            return user;
        }
    }
   
    // update-function
    async updateUser(userId:string, username: string, phoneNumber: string, password: string, address: string, dateOfBirth: string, age: number, gender: string){
        const updatedUser  = await this.findUser(userId);
        if(username){
            updatedUser.username = username;
        }
        if(phoneNumber){
            updatedUser.phoneNumber = phoneNumber;
        }
        if(password){
            updatedUser.password = password;
        }
        if(address){
            updatedUser.address = address;
        }
        if(dateOfBirth){
            updatedUser.dateOfBirth = dateOfBirth;
        }
        if(gender){
            updatedUser.gender = gender;
        }
        if(age){
            updatedUser.age = age;
        }
        const result = await updatedUser.save();
        return result;  
    }
    
    // delete-user-function
    async removeUser(userId:string){
        const user = await this.userModel.deleteOne({_id:userId}).exec();
        return user;
    }
    
    // find-single-user-function
    async findUser(id:string): Promise<User>{
        let user;
        try{
          user=await this.userModel.findById(id);
        }catch(err){
            throw new NotFoundException('Could not find user.');
        }
        if(!user){
            throw new NotFoundException('Could not find user.');
        }  

        return user
    }
} 