import mongoose from 'mongoose';
import { TAddress, TFullName, TOrder, TUser } from './users.interface';
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

const UserSchema = new Schema<TUser>({
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

// post hook to remove the password while getting the response from Db after user creation.
UserSchema.post('save', async (data, next) => {
  data.password = '';
  next();
});

export const UserModel = model<TUser>('User', UserSchema);
