import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    //mongoose.connect() method returns us JS Object
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected!! DB HOST: ${connectionInstance.connection.host}`
    );
    // console.log("connectionInstance: ", connectionInstance);
  } catch (error) {
    console.log(`MongoDB connection Error: `, error);
    process.exit(1);
  }
};

export default connectDB;
