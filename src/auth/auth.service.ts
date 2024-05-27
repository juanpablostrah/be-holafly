import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as bcryptjs from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if(!user){
      throw new UnauthorizedException('email is wrong')
    }
    const isPasswordValid = await bcryptjs.compare(pass, user.password)
    if(!isPasswordValid){
      throw new UnauthorizedException('password is wrong')
    }
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      id: user.id,
      email: user.email,
      access_token: this.jwtService.sign(payload),
    };
  }
}
