import mongoose from "mongoose";
import config from "config";

const db = config.get("mongoURI");


const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Database Initiated ...");
  } catch (err) {
    console.err(err.message);
    // EXIT process with failure
    process.exit(1);
  }
};

export default connectDB;
