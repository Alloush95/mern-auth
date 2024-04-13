import User from "../models/models.Users.js";
import bcrypt from "bcryptjs";


export const signUp = async (req, res) => {
    const {username, email, password} = req.body;
    const hashPassword = bcrypt.hashSync(password, 10)
    const newUser = new User({username, email, password: hashPassword});
    try{
        await newUser.save()
        res.status(201).json({message: "User created successfully"})
    } catch (error) {
        res.status(500).json(error.message) 
    }
}