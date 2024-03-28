import express from 'express'

const Router = express.Router()
import { registerController } from '../../controllers/registerController'
Router.route('/register')
  .post(registerController.createNew)
// Router.route('/verify/:token')
//   .get(registerController.createNew)
export const registerRoute = Router