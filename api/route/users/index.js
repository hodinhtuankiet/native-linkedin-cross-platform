import express from 'express'
import { userRoute } from './userRoute'
import { userProfile } from './userProfile'
const Router = express.Router()

// Register API
Router.use('/users', userRoute)

Router.use('/profile', userProfile)


export const USER_APIs = Router