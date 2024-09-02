import express from "express";
import { PrismaClient } from "@prisma/client";
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";

const app = express();
const port = process.env.PORT || 4000;

const prisma = new PrismaClient();

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}!!!!!!!`);
});

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

