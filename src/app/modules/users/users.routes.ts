import express from 'express';
import { userControllers } from './users.controllers';

const router = express.Router();

// User related routes.
router.post('/', userControllers.createUser); // to create a new user in DB.
router.get('/', userControllers.getAllUsers); // to retrieve all users from DB
router.get('/:userId', userControllers.getSingleUser); // to retrieve a single user from DB
router.put('/:userId', userControllers.updateSingleUser); // to update a single user in DB
router.delete('/:userId', userControllers.deleteSingleUser); // to delete a single user from DB
router.put('/:userId/orders', userControllers.addNewOrder); // to add a new order for a user

export const userRoutes = router;
