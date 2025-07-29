const express = require("express");
const connectDB = require("./DB/db");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
// Or customize CORS
// app.use(cors({
//   origin: "http://localhost:5173",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

app.use(
  cors({
    origin: [
      "https://expense-manager-backend-1-c3hh.onrender.com/",
      "http://localhost:5173",
      "https://income-manager-two.vercel.app/",
    ],
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
