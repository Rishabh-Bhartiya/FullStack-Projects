import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/mongoDB.js'
import userRouter from './routes/User.Route.js'
import chatRouter from './routes/Chat.Route.js'
import messageRouter from './routes/Message.Route.js'
import creditRouter from './routes/Credit.Route.js'
import { stripeWebHooks } from './controllers/Webhooks.Controller.js'

const app = express()

await connectDB()

// Stripe Webhooks
app.post('/api/stripe', express.raw({type: 'application/json'}), stripeWebHooks)

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => res.send('Server is Live !'))
app.use('/api/user', userRouter)
app.use('/api/chat', chatRouter)
app.use('/api/message', messageRouter)
app.use('/api/credit', creditRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is Running on PORT : ${PORT}`);
    
})