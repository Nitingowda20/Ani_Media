import express from "express";
import { PrismaClient } from "@prisma/client";
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";
import cookieParser from "cookie-parser"; 
import postRoute from './routes/postRoute.js'
import commentRoute from "./routes/commentRoute.js";

const app = express();
const port = process.env.PORT || 4000;

const prisma = new PrismaClient();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);



app.listen(port, () => {
  console.log(`Server is running on port ${port}!!!!!!!`);
});
// console.log("PRisma c")

// Error-handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

