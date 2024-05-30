import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signUp = async(req, res ) => {
    try{
        const {fullName, username, password, confirmPassword, gender} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error: "password don't match"});
        }

        const user = await User.findOne({username});
        if(user) {
            return res.status(400).json({ error: "username already exists"});
        }

        // HASH PASSWORD HERE
        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, genSalt);


        // profilePicture

        const boyProfilePic= `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic= `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });

        if(newUser){
            // Generate JWT Tokens
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        }else {
            res.status(400).json({error: "Invalid user data"});
        }
    }catch(err){
        console.log("Error in Signup Controller", err.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const login = async(req, res ) => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "" );

        if(!user || !isPasswordCorrect){
            return res.status(400).json({ error: "Invalid Credentials"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });

    }catch(err){
        console.log("Error in Login Controller", err.message);
        res.status(500).json({ error: "Internal Server Error"});
    }
}

export const logOut = (req, res ) => {
    try{
        res.cookie("jwt", "", { maxAge: 0});
        res.status(200).json({message: "Logout successfully"});
    }catch(err){
        console.log("Error in Logout Controller", err.message);
        res.status(500).json({ error: "Internal Server Error"});
    }
}
