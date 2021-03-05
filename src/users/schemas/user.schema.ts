import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  partnerName: string;

  @Prop()
  firstname: string;

  @Prop()
  surname: string;

  @Prop()
  phone: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  dateOfBirth: Date;

  @Prop()
  address: string;

  @Prop()
  bankAddress: string;

  @Prop()
  codeITN: string;

  @Prop()
  companyName: string;

  @Prop()
  expiresSoon: string;

  @Prop({ default: new Date() })
  createdDate: Date;

  @Prop()
  role: number;

  @Prop({ default: 1 })
  status: number;

  @Prop({ default: true })
  isFirstLogin: boolean;

  @Prop()
  id: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
