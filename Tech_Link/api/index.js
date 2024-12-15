import express from "express";
import { PrismaClient } from "@prisma/client";
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import postRoute from "./routes/postRoute.js";
import commentRoute from "./routes/commentRoute.js";
import savelist from "./routes/savelist.js";
import likeRoute from "./routes/likeRoute.js";
import quizRoute from "./routes/quizRoute.js";
import topicRoute from "./routes/topicRoute.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;

const prisma = new PrismaClient();

app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.use(
  cors({
    //replace it with deployed frontend url
    // origin: "http://localhost:5173",
    origin: "https://tech-insights-frontend-nit.onrender.com",
    credentials: true,
  })
);

app.get("/health", (req, res) => {
  return res.json("OK");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);
app.use("/api/savelist", savelist);
app.use("/api/like", likeRoute);
app.use("/api/quiz", quizRoute);
app.use("/api/topic", topicRoute);

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
