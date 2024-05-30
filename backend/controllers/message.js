import Conversation from "../models/conversation.js";
import Message from "../models/Message.js";

export const sendMessage = async(req, res) => {
    try{
        const { message } = req.body;
        const { id: receiverId } = req.params; 
        const senderId = req.user._id;
        
        let conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId]
            }
        });

        if(!conversation){
            conversation = await Conversation.create({
                participants: [ senderId, receiverId ]
            });
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message
        });


        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        // SOCKET IO Functionality GO HERE

        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);
    }catch(err){
        console.log("Error in sendMessage Controller", err.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}


export const getMessages = async (req, res) => {
    try{
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, userToChatId]
            }
        }).populate("messages");

        if(!conversation){
            return res.status(200).json([]);
        }

        const messages = conversation.messages;

        res.status(200).json(messages);
        
    }catch(err){
        console.log("Error in Get Messages Controller", err.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};