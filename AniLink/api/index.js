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

//   // try {
//   //   const users = await prisma.user.findMany();
//   //   res.json(users);
//   // } catch (error) {
//   //   res.status(500).json({ error: "An error occurred while fetching users." });
//   // }
//   res.json("HEeeeeeeeeeeeee")

app.listen(port ,() => {
  console.log(`Server is running on port ${port}!!!!!!!`);
});
