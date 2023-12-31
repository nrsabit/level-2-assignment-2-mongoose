import mongoose from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserStaticModel,
} from './users.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const { Schema, model } = mongoose;

const FullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
});

const AddressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, 'Street is required'] },
  city: { type: String, required: [true, 'City is required'] },
  country: { type: String, required: [true, 'Country is required'] },
});

const OrderSchema = new Schema<TOrder>({
  productName: { type: String, required: [true, 'Product Name is Required'] },
  price: { type: Number, required: [true, 'Price is Required'] },
  quantity: { type: Number, required: [true, 'Quantity is Required'] },
});

const UserSchema = new Schema<TUser, UserStaticModel>({
  userId: {
    type: Number,
    required: [true, 'User Id is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
  },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: { type: FullNameSchema, required: true },
  age: { type: Number, required: [true, 'Age is required'] },
  email: { type: String, required: [true, 'Email is required'] },
  isActive: { type: Boolean, required: true, default: true },
  hobbies: { type: [String], required: [true, 'Hobbies are required'] },
  address: { type: AddressSchema, required: true },
  orders: OrderSchema,
});

// pre hook, to encrypt the password before saving into the DB.
UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// defining the custom static method to check the user is exists in Db or not.
UserSchema.statics.isUserExists = async (userId: string) => {
  const userIdNum = parseInt(userId);
  const existingUser = await UserModel.findOne({ userId: userIdNum }, {password : 0, _id : 0});
  return existingUser;
};

// checking the user exists or not by using aggregate. 
UserSchema.statics.isUserAvailable = async (userId : string) => {
  const userIdNum = parseInt(userId);
  const existingUser = await UserModel.aggregate([{$match: {userId : {$eq: userIdNum}}}]);
  return existingUser;
}

export const UserModel = model<TUser, UserStaticModel>('User', UserSchema);
