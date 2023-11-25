import { TUser } from './users.interface';
import { UserModel } from './users.model';

// creating a new user in DB
const createUserInDB = async (userInfo: TUser) => {
  const result = await UserModel.create(userInfo);
  return result;
};

// getting all users from DB
const getAllUsersFromDB = async () => {
  const result = await UserModel.aggregate([
    {
      $project: {
        _id: 0,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ]);
  return result;
};

// getting a single user from DB
const getSingleUserFromDB = async (userId: string) => {
  const result = await UserModel.isUserExists(userId);
  return result;
};

// update a single user in DB
const updateSingleUserInDb = async (userId: number, updatedInfo: TUser) => {
  if (await UserModel.isUserExists(userId.toString())) {
    const result = await UserModel.updateOne({ userId }, updatedInfo);
    if (result.modifiedCount === 1) {
      const updatedUser = await UserModel.isUserExists(userId.toString());
      return updatedUser;
    }
  } else {
    throw new Error();
  }
};

export const UserServices = {
  createUserInDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserInDb,
};
