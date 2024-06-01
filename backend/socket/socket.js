import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});


export const getReceiverId = (receiverId) => {
    return userSocketMap[receiverId];
}


const userSocketMap = {}; // { userId: socketId};

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;

    if(userId !== "undefined"){
        userSocketMap[userId] = socket.id;
    }

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on("disconnect", () => {
        delete userSocketMap[userId];
        console.log("a user disconnected", socket.id);
        io.emit("getOnlinerUsers", Object.keys(userSocketMap));
    });


});


export { app, io, server };