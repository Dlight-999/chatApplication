import User from "../models/userModel";
import Chat from "../models/chatModel";

export const getChat = async(req, res)=>{
    const {userId} = req.body;
    try{
        let chat = await Chat.findOne({
            isGroupChat: false,
            users: {$all: [req.user.id, userId]},
        }).populate("users","-password");

        if(chat){
            res.status(200).json(chat);
        }
        else{
            const newChat = await Chat.create({
                chatName:"sender",
                isGroupChat: false,
                users: [req.user.id, userId],
            });
            res.status(200).json(newChat);
        }
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

export const getChats = async(req, res)=>{
    try{
        const chats = await Chat.find({users: {$elemMatch: {$eq: req.user._id}}})
        .populate("users", "-password")
        .populate("latestMessage");
        res.status(200).json(chats);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}