import { Server } from "socket.io";
import Message from "../models/messageModel";
import Chat from "../models/chatModel";


const socketConfig = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("New client connected", socket.id);

        socket.on("joinChat", (chatId) => {
            socket.join(chatId);
            console.log(`User joined chat: ${chatId}`);
        });

        socket.on("sendMessage", async ({ chatId, content, senderId }) => {
            const message = new Message({ sender: senderId, content, chat: chatId });
            await message.save();

            await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

            const fullMessage = await Message.findById(message._id)
                .populate("sender", "name email")
                .populate("chat");

            io.to(chatId).emit("messageReceived", fullMessage);
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected", socket.id);
        });
    });
};

export default socketConfig;
