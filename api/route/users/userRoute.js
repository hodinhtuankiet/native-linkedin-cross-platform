import express from 'express'

const Router = express.Router()
import { userController } from '../../controllers/userController'
Router.route('/profile/:userId')
  .get(userController.findIdByProfile)
  Router.route('/users/:userId')
  .get(userController.findIdByUserId)
export const userRoute = Router