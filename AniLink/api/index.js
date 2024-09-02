import express from 'express';
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/userRoute.js';
import authRoutes from "./routes/authRoute.js";


const app =express();
const port = process.env.PORT || 1234;

const prisma = new PrismaClient();

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);


app.listen(port ,() => {
  console.log(`Server is running on port ${port}!!!!!!!`);
});
