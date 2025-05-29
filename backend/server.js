import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import userRoutes from "./routes/user.js";
import connectToMongo from "./db/connectToMongo.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";
// import cors from "cors";

// use npm packages
dotenv.config();

// const app = express(); // remove from here because we using socket io for realtime messages;
// environment variables
const Port = process.env.PORT;

// database connected
connectToMongo();

// use  
app.use(express.json());
app.use(cookieParser());
// app.use(cors());

// routes

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// change it app to server listen for the socket io
server.listen(Port, () => {
    console.log("Server is running on port", Port);
});