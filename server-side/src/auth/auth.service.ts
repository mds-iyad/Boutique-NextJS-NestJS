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
    const user = await this.usersService.findOneByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user.toObject();
      // console.log(result)
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, _id: user._id, roles: user.roles, panier: user.panier };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
