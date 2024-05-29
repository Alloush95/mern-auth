import User from "../models/models.Users.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";


// Sign up controller
export const signUp = async (req, res, next) => {
    const {username, email, password} = req.body;
    const hashPassword = bcrypt.hashSync(password, 10)
    const newUser = new User({username, email, password: hashPassword});
    try{
        await newUser.save()
        res.status(201).json({message: "User created successfully"})
    } catch (error) {
        next(error) 
    }
}

// Sign in controller
export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({ email });// find user by email
        if(!user) return next(errorHandler(404, "User username or password is incorrect"));

        const validPassword = await bcrypt.compare(password, user.password); // compare password with hashed password
        if(!validPassword) return next(errorHandler(401, "username or password is incorrect"));

        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET); // create token with user id and secret key from .env file
        
        const { password: _, ...userInfo } = user._doc; // remove password from user data
        // set cookie with token and user data 
        const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
        res.cookie("access_token", token, { httpOnly: true, expires: expiryDate }).status(200).json(userInfo);        
    }catch(error){
        next(error)
    }
};

export const googleSignIn = async (req, res, next) => {
    const { name, email, photoURL } = req.body;
    try{
        const user = await User.findOne({ email:req.body.email });
        if(user){
            const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET); // create token with user id and secret key from .env file
            const { password: _, ...userInfo } = user._doc; // remove password from user data
            // set cookie with token and user data 
            const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
            res.cookie("access_token", token, { httpOnly: true, expires: expiryDate }).status(200).json(userInfo); 
            
        }else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashPassword = bcrypt.hashSync(generatedPassword, 10)
            const newUser = new User({
                username: name,
                email, 
                password: hashPassword, 
                photo: photoURL
            });
            
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.TOKEN_SECRET); // create token with user id and secret key from .env file
            const { password: _, ...userInfo } = newUser._doc; // remove password from user data
            // set cookie with token and user data
            const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
            res.cookie("access_token", token, { httpOnly: true, expires: expiryDate }).status(200).json(userInfo);
        }

    }catch(error){
        next(error)
    }
}
   