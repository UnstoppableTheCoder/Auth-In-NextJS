import mongoose from "mongoose";

export default async function connect() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB connected successfully: ", conn.connection.host);
  } catch (error) {
    console.log("MongoDB connection failed: ", error);
    process.exit(1);
  }

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error: ", err);
    process.exit(1);
  });
}
