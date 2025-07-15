import express from "express";
import authRoute from "./src/routes/authRoute.js";

const app = express();

app.use("/api/auth", authRoute);

app.listen(5001, () => {
  console.log("server is running on port 5001");
});
