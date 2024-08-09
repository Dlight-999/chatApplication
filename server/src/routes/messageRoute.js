import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.post("/",sendMessage);
router.get("/:chatId", getMessages);

export default router;