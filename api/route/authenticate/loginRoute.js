import express from 'express'

const Router = express.Router()
import { loginController } from '../../controllers/loginController.js'
Router.route('/login')
  .post(loginController.createNew)
export const loginControllerr = Router