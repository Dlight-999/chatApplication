import express from "express";

import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import { setupSocket } from "./src/config/socket.js";
import authRoutes from "./src/routes/authRoute.js";
import http from 'http';
import { Server } from "socket.io";
import profileRoute from "./src/routes/profileRoute.js";
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use('/api/profile',profileRoute);
const server = http.createServer(app);
const io = setupSocket(server);
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle real-time events here
  // Example: socket.on('chat message', (message) => { ... });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
