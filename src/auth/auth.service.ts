import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/users/users.service';
import { matchPasswords } from 'src/helpers/helpers';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(payload: any) {
    return await this.usersService.findOne(payload.email);
  }

  async login(user: any) {
    const hashedPassword = await this.usersService.findOne(
      user.email,
      'password id email',
    );

    if (!hashedPassword) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await matchPasswords(
      user.password,
      hashedPassword.password,
    );

    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { email: hashedPassword.email, id: hashedPassword._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
