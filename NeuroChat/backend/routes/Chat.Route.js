import express from 'express'
import { protect } from '../middlewares/auth.js'
import { createChat, deleteChat, getChats } from '../controllers/Chat.Controller.js'

const chatRouter = express.Router()

chatRouter.get('/create', protect, createChat) //
chatRouter.get('/get', protect, getChats)
chatRouter.post('/delete', protect, deleteChat)

export default chatRouter;