import express from "express";
import { getChat, getChats } from "../controllers/chatController.js";


const router = express.Router();
router.post("/", getChat);
router.get("/", getChats);

export default router;