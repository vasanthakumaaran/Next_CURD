import mongoose from "mongoose";

const connectMongoDB = async (): Promise<void> => {
    try {
        const mongodbURI = process.env.MONGODB_URI;
        if (!mongodbURI) {
            throw new Error("MongoDB URI is not defined");
        }

        await mongoose.connect(mongodbURI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", (error as Error).message);
    }
};

export default connectMongoDB;
