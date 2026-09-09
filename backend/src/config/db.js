import mongoose from "mongoose"

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Está ok")
    } catch (error) {
        console.error("Mongo DB OK",error);
        process.exit(1);
    }
}