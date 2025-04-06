import mongoose from "mongoose";
export const connectWithDb = async () => {
    if (mongoose.connection.readyState !== 0) return;

    try { 
        await mongoose.connect(process.env.NEXT_PUBLIC_DATABASE_URL as string);

        console.log("Connection is established with MongoDB.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};