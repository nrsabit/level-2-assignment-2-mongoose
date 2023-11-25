import { TOrder, TUser } from './users.interface';
import { UserModel } from './users.model';

// creating a new user in DB
const createUserInDB = async (userInfo: TUser) => {
  const result = await UserModel.create(userInfo);
  const userWithOutPass = await UserModel.findOne({userId : result.userId}, {password : 0, _id : 0})
  return userWithOutPass;
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
    throw new Error('User not found');
  }
};

// delete a user from Db
const deleteSingleUserInDb = async (userId: number) => {
  if (await UserModel.isUserExists(userId.toString())) {
    const result = await UserModel.deleteOne({ userId });
    return result;
  } else {
    throw new Error('User not found');
  }
};

// add an order for a user in Db.
const addNewOrderInDB = async (userId: number, orderInfo: TOrder) => {
  const existingUser = await UserModel.isUserExists(userId.toString());
  if (existingUser) {
    if ('orders' in existingUser) {
      const result = await UserModel.updateOne(
        { userId },
        { $push: { orders: orderInfo } },
      );
      return result;
    } else {
      const result = await UserModel.updateOne(
        { userId },
        { orders: [orderInfo] },
      );
      return result;
    }
  } else {
    throw new Error('User not found');
  }
};

// get all orders from a user.
const getAllOrdersFromUser = async (userId: number) => {
  const [existingUser] = await UserModel.isUserAvailable(userId.toString());
  if (existingUser) {
    if (existingUser.orders) {
      const result = existingUser.orders;
      return result;
    } else {
      throw new Error('No orders available for the user');
    }
  } else {
    throw new Error('User not found');
  }
};

// get sum of all orders price for a user.
const getSumOfAllOrdersFromUser = async (userId: number) => {
  const [existingUser] = await UserModel.isUserAvailable(userId.toString());
  if (existingUser) {
    if (existingUser.orders) {
      const result = await UserModel.aggregate([
        { $match: { userId: { $eq: userId } } },
        { $unwind: '$orders' },
        { $group: { _id : null, totalPrice : {$sum : "$orders.price"} } },
      ]);
      return result;
    } else {
      throw new Error('No orders available for the user');
    }
  } else {
    throw new Error('User not found');
  }
};

//

export const UserServices = {
  createUserInDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserInDb,
  deleteSingleUserInDb,
  addNewOrderInDB,
  getAllOrdersFromUser,
  getSumOfAllOrdersFromUser,
};
