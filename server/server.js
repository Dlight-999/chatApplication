import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import { setupSocket } from "./src/config/socket.js";
import authRoutes from "./src/routes/authRoute.js";


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

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
