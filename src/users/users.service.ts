import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { createHashedPassword } from 'src/helpers/helpers';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { User as UserSch, UserDocument } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserSch.name) private userModel: Model<UserDocument>,
  ) {}

  async findOne(email: string, fieldsFromDb?: string): Promise<User | null> {
    return this.userModel.findOne({ email }).select(fieldsFromDb);
  }

  async create(userDto: CreateUserDto) {
    const hashedPassword = await createHashedPassword(userDto.password);

    const userObj = { ...userDto, password: hashedPassword };
    const newUser = new this.userModel(userObj);

    return newUser.save();
  }

  //!TODO
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async removeUser(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id);
  }

  async update(id: string, userDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, userDto, { new: true });
  }
}
