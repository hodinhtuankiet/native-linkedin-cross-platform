import express from 'express'

const Router = express.Router()
import { registerController } from '../../controllers/registerController.js'
Router.route('/register')
  .post(registerController.createNew)
Router.route('/verify/:token')
  .get(registerController.verifyEmail)
export const registerRoute = Router