import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const port = 3000;
const app = express()
const passWord = process.env.PASS_WORD; // get the password from the .env file

// Connect to MongoDB
mongoose.connect(passWord, {useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("connected to MongoDB ")
}).catch((err)=>{
    console.log(err);
})




app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})