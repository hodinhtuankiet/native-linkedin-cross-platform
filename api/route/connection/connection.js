import express from 'express'

const Router = express.Router()
import { userController } from '../../controllers/userController'
Router.route('/')
  .get(userController.findIdByProfile)
export const connectionRoute = Router