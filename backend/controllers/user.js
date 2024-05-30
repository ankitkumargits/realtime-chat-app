import User from "../models/User.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const allUsers = await User.find({ _id : { $ne: loggedInUserId }}, { password: 0 });
        res.status(200).json(allUsers);
    }catch(err){
        console.log("Error in get Users Controller", err.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}