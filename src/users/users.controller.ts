import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
  HttpStatus,
  HttpCode,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.interface';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private UserService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    const isExists = await this.UserService.findOne(createUserDto.email);
    if (isExists) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    return this.UserService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.UserService.findAll();
  }

  @Delete('id')
  removeUser(@Param('id') id) {
    return `Remove ${id}`;
  }

  @Put(':id')
  updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id) {
    return `Update ${id}`;
  }
}
