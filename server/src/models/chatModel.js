//chatName
//isgroupchat
//users
//latest message
//group admin

import mongoose from "mongoose";
import User from "./userModel.js";
const chatSchema = new mongoose.Schema(

    {
        chatName:{
            type: String
        },
        isGroupChat:{
            type: Boolean,
            default: false
        },
        users:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        latestMessage:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        },
        groupAdmin:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps:true,
    }
)

const Chat = mongoose.model("Chat",chatSchema);
export default Chat;