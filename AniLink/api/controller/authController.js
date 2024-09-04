import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All feilds are required"));
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
  } catch (error) {
      return next(errorHandler(400, "An error occurred while creating the user"));
  }
};

//Sign-in
export const signin = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password  || username === "" || password === "") {
    next(errorHandler(400, "All feilds are required"));
  }

  try {
    const validUser = await prisma.user.findUnique({
      where: { username },
    });
    if (!validUser) {
      return next(errorHandler(404, "Invalild Username"));
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(404, "Invalild Password"));
    }

    // Generate a JWT token
    const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET);

    // Destructure and exclude the password field from the response
    const { password: pass, ...userWithoutPassword } = validUser;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(userWithoutPassword);
  } catch (error) {
    console.error("Error during sign-in:", error);
    return next(errorHandler(500, "An error occurred while signing in"));
  }
};
