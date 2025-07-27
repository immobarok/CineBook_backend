import { clerkMiddleware } from '@clerk/express'
import express from 'express';
import cors from 'cors';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import 'dotenv/config';
import { connectDB } from './config/database.js';
import showRouter from './routes/showRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import adminRouter from './routes/adminRoutes.js';

const app = express();
const port = 4000;

await connectDB();

app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

app.get('/', (req, res) => {
  res.send("Server is running")
})
app.use('/api/inngest', serve({ client: inngest, functions }))
app.use('/api/show',showRouter)
app.use('/api/booking',bookingRouter)
app.use('/api/admin',adminRouter)

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})