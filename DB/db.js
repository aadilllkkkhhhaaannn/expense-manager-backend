const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to DB:", process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ DB Connected:", conn.connection.name);
  } catch (err) {
    console.error("❌ DB Connection Failed:", err.message);
  }
};

module.exports = connectDB;
