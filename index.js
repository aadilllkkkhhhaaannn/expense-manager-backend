const express = require("express");
const connectDB = require("./DB/db");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
const allowedOrigins = [
  "http://localhost:5173",
  "https://income-manager-two.vercel.app",
  "https://expense-manager-backend-1-c3hh.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // allow karega
      } else {
        callback(new Error("CORS error: Not allowed")); // block karega
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

const startServer = async () => {
  await connectDB(); // wait until DB connects

  app.get("/", (req, res) => {
    res.json({ msg: "WELCOME TO THE EXPENSE MANAGER APP" });
  });

  app.use("/api/transaction/user", require("./Routes/transaction")); // 👈 correct path

  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
};

startServer();
