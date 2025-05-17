import jwt from "jsonwebtoken"
import User from "../models/user.Model.js"
export const authUser = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({message : "Unauthorized Access"});
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        if(!verify){
            return res.status(401).json({message : "Unauthorized Access"});
        }
        const user = await User.findById(verify.userId);
        if(!user){
            return res.status(400).json({message : "User not found"})
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in authUser");
        res.status(500).send("Internal Server Error");
    }
}