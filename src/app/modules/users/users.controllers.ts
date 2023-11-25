import { Request, Response } from 'express';
import { UserValidationSchema } from './users.validation';
import { UserServices } from './users.services';

// controller to create a new user in DB.
const createUser = async (req: Request, res: Response) => {
  try {
    const userInfo = req.body;
    // zod validation.
    const zodValidatedData = UserValidationSchema.parse(userInfo);
    // creating the user into DB
    const result = await UserServices.createUserInDB(zodValidatedData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'User was not created',
      data: err,
    });
  }
};

export const userControllers = {
  createUser,
};
