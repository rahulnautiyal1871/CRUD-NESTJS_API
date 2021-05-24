import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
      console.log(username)
    const user = await this.usersService.findOne(username,pass);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    } 
    return null;
  }

  async login(user: any) {
    const modal = await this.usersService.findOne(user.username,user.password);
    console.log("hello", modal)
   if(!modal){
       return {statusCode: 401, message:"Not Authorised !"}
   }        
    const payload = { username: modal.username, sub: modal._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async verifyUserToken(user: any){
    const Model = await this.usersService.findOne(user.username,user.password);
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    }; 
  }
}
