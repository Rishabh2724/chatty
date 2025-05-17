import bcrypt from "bcryptjs";
import User from "../models/user.Model.js"
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";


export const signup = async (req,res) =>{
    const {email, fullName , password} = req.body;
    try {
        if(password.length <= 6){
            return res.status(400).send("Password length must be greater than or equal to 6");
        }

        const user = await User.findOne({email: email});
        if(user){
            return res.status(400).send("This email already exists")
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);
        const newUser = new User({
            email :email,
            fullName : fullName,
            password :hashedPassword,
        })
        if(newUser){
            generateToken(newUser._id, res); //generate jwt token
            await newUser.save();
            res.status(201).json({
                _id : newUser._id,
                fullname : newUser.fullName,
                email : newUser.email
            });
        }
    } catch (error) {
        console.log("Error in signup controller")
        res.status(500).json({message : "Internal Server Error"});
    }
}
export const login = async (req,res) =>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(400).send("Invalid Credentials");
        }
        const hashedPassword = user.password;
        const cmpPass = bcrypt.compare(password , hashedPassword);
        if(!cmpPass) {
            return res.status(400).send("Invalid Credentials");
        }
        //generate jwt
        const token = generateToken(user._id, res);
        res.json({
            _id : user._id,
            email : user.email,
            fullName : user.fullName,
            profilePic : user.profilePic
        });
    } catch (error) {
        console.log("Error in login controller")
        res.status(500).json({message : "Internal Server Error"});
    }
}
export const logout = (req,res) =>{
    try {
        res.cookie("jwt", "", {maxAge : 0});
        res.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller")
        res.status(500).json({message : "Internal Server Error"});
    }
}
export const updateProfile =async (req,res)=>{
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({message : "Profile pic required"})
        }
        const uploadResponse= await cloudinary.uploader.upload(profilePic);
        const updatedUser=  await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url}, {new:true})
        res.status(200).json({updatedUser})
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}  
export const checkAuth = async (req,res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
    

}