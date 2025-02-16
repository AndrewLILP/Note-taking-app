import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const conn = await mongoose.connect('mongodb://localhost:27017/myapp');
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch(err){
        console.error(err);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;