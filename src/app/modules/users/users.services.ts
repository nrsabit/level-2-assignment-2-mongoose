import { TUser } from './users.interface';
import { UserModel } from './users.model';

// creating a new user in DB
const createUserInDB = async (userInfo: TUser) => {
  const result = await UserModel.create(userInfo);
  return result;
};

export const UserServices = {
  createUserInDB,
};
