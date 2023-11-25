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

// controller to get all users from Db.
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'User was not fetched successfully',
      data: err,
    });
  }
};

// controller to get a single user from DB.
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};

// update a single user.
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const updatedInfo = req.body;
    const { userId } = req.params;
    const userIdNum = parseInt(userId);
    // zod validation.
    const zodValidatedData = UserValidationSchema.parse(updatedInfo);
    // creating the user into DB
    const result = await UserServices.updateSingleUserInDb(
      userIdNum,
      zodValidatedData,
    );
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};

// deleting a user
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdNum = parseInt(userId);
    await UserServices.deleteSingleUser(userIdNum);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
