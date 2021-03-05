import { Document } from 'mongoose';

export interface User extends Document {
  readonly email: string;
  readonly password: string;

  readonly partnerName?: string;
  readonly firstname: string;
  readonly surname: string;
  readonly phone?: string;
  readonly dateOfBirth?: Date;
  readonly address?: string;
  readonly bankAddress?: string;
  readonly codeITN?: string;
  readonly companyName?: string;
  readonly expiresSoon?: string;

  readonly id: number;
  readonly createdDate: Date;
  readonly role: number;
  readonly status: number;
  readonly isFirstLogin: boolean;
}
