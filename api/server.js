import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'


dotenv.config()
const port = 3000;
const app = express()
app.use(express.json()); // to parse the incoming request with JSON payloads
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

app.use('/api/user', userRoute)  // use the user route
app.use('/api/auth', authRoute)  // use the user route