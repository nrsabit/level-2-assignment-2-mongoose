import express from 'express'
import { userControllers } from './users.controllers'

const router = express.Router()

// User related routes. 
router.post('/', userControllers.createUser) // to create a new user in db. 


export const userRoutes = router