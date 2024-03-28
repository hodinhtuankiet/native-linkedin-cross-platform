import express from 'express'
import { StatusCodes } from 'http-status-codes'
import registerRoute from './registerRoute'

const Router = express.Router()

// Register API
Router.use('/', registerRoute)
export const Authenticate_APIs = Router