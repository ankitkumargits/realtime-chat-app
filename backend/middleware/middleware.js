import jwt from "jsonwebtoken";
import User from "../models/User.js";

const middleware = async(req, res, next) => {
    try{
        const token = res.cookies?.jwt || req.headers["auth-token"];
        if(!token){
            return res.status(401).json({error: "Unauthorized - No Token Provided"});
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if(!decoded){
            return res.status(401).json({error: "Unauthorized - Invalid Token"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({error: "User not found"});
        }


        req.user = user;

        next();

    }catch(err){
        console.log("Error in middleware", err.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};


export default middleware;