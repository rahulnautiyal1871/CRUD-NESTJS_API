import * as mongoose from "mongoose";


export const UserSchema = new mongoose.Schema({
    username    :{type:String,required:true},
    phoneNumber :{type:String,required:true},
    password    :{type:String,required:true},
    address     :{type:String,required:true},
    dateOfBirth :{type:String,required:true},
    age         :{type:Number,required:true},
    gender      :{type:String,required:true,enum: ['male', 'female'],}
})

export interface User extends mongoose.Document {
   
         _id: string,
         username: string,
         phoneNumber: string,
         password: string,
         address: string,
         dateOfBirth: string,
         age: number,
         gender:string
     
}