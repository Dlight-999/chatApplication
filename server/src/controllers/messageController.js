import Message from "../models/messageModel";
import Chat from "../models/chatModel";

export const sendMessage = async (req, res)=>{
    // const {chatId, content} = req.body;
    try{
        const message = await Message.create({
            sender : req.user.id,
            content: req.body.content,
            chat: req.body.chatId,
        });
        await Chat.findByIdAndUpdate(req.body.chatId,{latestMessage:message});
        res.status(201).json(message);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};

export const getMessages = async(req,res) =>{
    try{
        const messages = await Message.find({chat: req.params.chatId})
        .populate("sender", "username email")
        .populate("chat");
        res.status(200).json(messages);
    }
    catch(error){
        res.status(500).json({message:error.message});
    };
}