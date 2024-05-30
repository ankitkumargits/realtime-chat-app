import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import userRoutes from "./routes/user.js";
import connectToMongo from "./db/connectToMongo.js";
import cookieParser from "cookie-parser";

// use npm packages
dotenv.config();

// environment variables
const app = express();
const Port = process.env.PORT;

// database connected
connectToMongo();

// use  
app.use(express.json());
app.use(cookieParser());

// routes

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


app.listen(Port, () => {
    console.log("Server is running on port 5000");
});