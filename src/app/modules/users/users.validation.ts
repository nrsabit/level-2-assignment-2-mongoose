import { z } from 'zod';

const FullNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name must be at least 1 character' }),
  lastName: z
    .string()
    .min(1, { message: 'Last name must be at least 1 character' }),
});

const AddressValidationSchema = z.object({
  street: z.string().min(1, { message: 'Street must be at least 1 character' }),
  city: z.string().min(1, { message: 'City must be at least 1 character' }),
  country: z
    .string()
    .min(1, { message: 'Country must be at least 1 character' }),
});

const OrderValidationSchema = z.object({
  productName: z
    .string()
    .min(1, { message: 'Product name must be at least 1 character' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  quantity: z
    .number()
    .int()
    .positive({ message: 'Quantity must be a positive number' }),
});

export const UserValidationSchema = z.object({
  userId: z.number().int().positive({ message: 'User ID must be required' }),
  username: z
    .string()
    .min(5, { message: 'Username must be at least 5 character long' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 character long' }),
  fullName: FullNameValidationSchema,
  age: z.number().positive({ message: 'Age must be a positive number' }),
  email: z.string().email({ message: 'Invalid email format' }),
  isActive: z.boolean().default(true),
  hobbies: z.array(
    z.string().min(1, { message: 'Hobby must be at least 1 item' }),
  ),
  address: AddressValidationSchema,
  orders: z.array(OrderValidationSchema).optional(),
});
