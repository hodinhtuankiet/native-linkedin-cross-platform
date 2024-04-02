import express from 'express'
import { userRoute } from './userRoute'
const Router = express.Router()

// Register API
Router.use('/', userRoute)


export const USER_APIs = Router