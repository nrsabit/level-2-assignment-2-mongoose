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
    {$project : {_id : 0, username : 1, fullName : 1, age : 1, email : 1, address: 1}}
  ])
  return result;
}

// getting a single user from DB 
const getSingleUserFromDB = async (userId : string) => {
  const result = await UserModel.isUserExists(userId)
  return result
}

export const UserServices = {
  createUserInDB,
  getAllUsersFromDB,
  getSingleUserFromDB
};
