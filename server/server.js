import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import connectDb from './config/db.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json())
connectDb()


app.get('/',(req,res)=>{
    res.json({
        message:'app is running'
    })
})


app.listen(PORT,()=>{
    console.log('app is running or PORT '+PORT);
})