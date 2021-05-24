import {Module } from '@nestjs/common'
import { UsersController } from './unsers.controller';
import { UsersService } from './users.service';
import {  MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';

@Module({
    imports:[MongooseModule.forFeature([{name:'User',schema:UserSchema}])],
    controllers:[UsersController],
    providers:[UsersService],
    exports:[UsersService]
})
export class UsersModule {}