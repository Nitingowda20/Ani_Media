import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";

const prisma = new PrismaClient(); 

export const signup = async (req, res , next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400 , "All feilds are required"))
  }

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      next(errorHandler(400, "User already exist"));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Return the created user (or a success message)
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } 
  catch (error) {
    next(errorHandler(400, "An error occurred while creating the user"));
  }
};