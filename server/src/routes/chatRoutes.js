import express from "express";
import { getChat, getChats } from "../controllers/chatController";


const router = express.router;
router.post("/", getChat);
router.get("/", getChats);

export default router;