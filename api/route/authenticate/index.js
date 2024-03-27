import express from 'express'
import { StatusCodes } from 'http-status-codes'
import register from '~/app/(authenticate)/register'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'Already to use ' })
})

// BOARD API
Router.use('/boards', boardRoute)
// BOARD API
Router.use('/columns', columnRoute)
// BOARD API
Router.use('/cards', cardRoute)
/** Upload APIs */
Router.use('/profile', uploadRoute)
export const Authenticate_APIs = Router