import mongoose from "mongoose";

const dbConnetion = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Database connected success".bgCyan);
  } catch (error) {
    console.log(`Error while database connected ${error.message}`);
  }
};

export default dbConnetion;
