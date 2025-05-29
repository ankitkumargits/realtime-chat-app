import express from "express";
import { getUsersForSidebar } from "../controllers/user.js";
import middleware from "../middleware/middleware.js";

const router = express.Router();

router.get("/", middleware , getUsersForSidebar);

export default router;