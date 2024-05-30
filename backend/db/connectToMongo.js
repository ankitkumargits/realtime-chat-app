import mongoose from "mongoose"


const connectToMongo = async() => {
    try{
        const url = process.env.MONGODB_URI;
        await mongoose.connect(url);
        console.log("Connected to the MongoDB");
    }catch(err){
        console.log("Error connecting to Mongo", err.message);
    }
}

export default connectToMongo;