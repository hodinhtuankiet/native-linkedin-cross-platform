import express from 'express'
import { connectionRoute } from './connection'
import { connectionRequestRoute } from './connectionRequest'
const Router = express.Router()

// Register API
Router.use('/connection-request', connectionRequestRoute)

Router.use('/connection', connectionRoute)


export const CONNECTION_APIs = Router