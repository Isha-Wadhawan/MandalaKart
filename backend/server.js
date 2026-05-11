import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import uploadRouter from './routes/uploadRoute.js';

// APP CONFIG
const app = express()
const port = process.env.PORT || 4000
connectDB();
connectCloudinary();


// MIDDLEWARES
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors({
  origin: ["http://localhost:5173", "https://mandala-kart-tiltz7mq2-ishwa2746-8129s-projects.vercel.app", "https://mandala-kart-tnrt.vercel.app"],
  credentials: true
}));

// API END-POINTS
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.use('/api/upload', uploadRouter);

app.get('/',(req,res)=>{
    res.send('API WORKING BROHH')
})

app.listen(port,()=>console.log("Server started on port : " + port))

