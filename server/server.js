import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoute.js";
import profileRoute from "./src/routes/profileRoute.js";
import messageRoute from "./src/routes/messageRoute.js";
import chatRoute from "./src/routes/chatRoute.js";
import io from "./src/config/socket.js";
import socketConfig from "./src/config/socket.js";
import { createServer } from "http";


dotenv.config();


connectDB();

const app = express();


const server = createServer(app);
socketConfig(server);
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use('/api/profile',profileRoute);
app.use('/api/chat',chatRoute);
app.use('/api/message',messageRoute);




const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

io.attach(server);