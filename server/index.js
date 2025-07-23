import express from "express";
import dotenv from "dotenv";
import authRoute from "./src/routes/authRoute.js";
import { connectDB } from "./src/lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  connectDB();
});
