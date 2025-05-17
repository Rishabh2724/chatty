import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
export const getUsers = async (req,res)=>{
    try {
        const userId = req.user._id;
        const users = await User.find({_id : { $ne : userId}}).select("-password");
        res.status(200).json(users);
    } catch (error) {
        console.log("error in getUsers :  ",error.message);
        res.status(500).json({message : "Internal Server Error"})
    }
}
export const getMessages = async(req,res)=>{
    try {
        const userId = req.user._id;
        const chatUserId= req.params._id;
        
        const messages = await Message.find({
            $or:[
                {senderId : chatUserId , receiverId : userId},
                {senderId : userId , receiverId : chatUserId}
            ]
        })
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages : ",error.message);
        res.status(500).json({message : "Internal Server Error"});
    }
}
export const sendMessage = async(req,res)=>{
    try {
        const {text , image } =  req.body;
        const senderId = req.user._id;
        const receiverId = req.params._id;

        let imageUrl;
        if(image){
            const uploadedResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadedResponse.secure_url;
        }
        const message = new Message({
            senderId, 
            receiverId, 
            text,
            image: imageUrl
        })
        await message.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", message);
        }


        res.status(201).json(message)
    } catch (error) {
        console.log("Error in send message : ", error.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}