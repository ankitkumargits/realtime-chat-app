import express from "express";
import { getMessages, sendMessage } from "../controllers/message.js";
import middleware from "../middleware/middleware.js";

const router = express.Router();

router.post("/send/:id", middleware , sendMessage);
router.get("/:id", middleware, getMessages);

export default router;