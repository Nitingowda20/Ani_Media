import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//testing
export const user = (req, res) => {
  res.json("HELLO WORLD");
};

//Update user
export const updateUser = async (req, res, next) => {
  const userIdFromParams = parseInt(req.params.userId, 10); // Convert ID to integer
  const userIdFromToken = parseInt(req.user.id, 10); // Ensure user.id is an integer

  if (userIdFromParams !== userIdFromToken) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }

  const dataToUpdate = {};

  // Hash password if provided
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }
    dataToUpdate.password = bcrypt.hashSync(req.body.password, 10);
  }

  // Validate and update username
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }
    dataToUpdate.username = req.body.username;
  }

  // Update email and profilePicture only if provided
  if (req.body.email) {
    dataToUpdate.email = req.body.email;
  }
  if (req.body.profilePicture) {
    dataToUpdate.profilePicture = req.body.profilePicture;
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userIdFromParams, // Use integer ID here
      },
      data: dataToUpdate,
    });

    const { password, ...rest } = updatedUser; // Exclude password from response
    res.status(200).json(rest);
  } catch (error) {
    console.error("Error updating user:", error);
    next(error);
  }
};

//Delete the user
export const deleteUser = async (req, res, next) => {
  // Convert both ids to integers for comparison
  const userIdFromParams = parseInt(req.params.userId, 10); // Convert ID to integer
  const userIdFromToken = parseInt(req.user.id, 10); // Ensure user.id is an integer

  if (userIdFromParams !== userIdFromToken) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }

  try {
    await prisma.user.delete({
      where: {
        id: userIdFromParams,
      },
    });
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};

//Signout USER

export const signout = (req, res, next) => {
  try {
    res.clearCooke = "access_token";
    res.status(200).json("You have been signed out");
  } catch (error) {
    next(error);
  }
};

//get user
export const getuser = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res
      .status(403)
      .json(errorHandler(403, "You are not allowed to see the user"));
  }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? "asc" : "desc";

    //users with pagination, filters, and sorting
    const users = await prisma.user.findMany({
      orderBy: { createdAt: sortDirection },
      skip: startIndex,
      take: limit,
    });

    //total number of users
    const totalUsers = await prisma.user.count();

    // Calculate date for one month ago
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    // Fetch number of users created in the last month
    const lastMonthUsers = await prisma.user.count({
      where: { createdAt: { gte: oneMonthAgo } },
    });
    const userWithoutPassword = users.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
    res.status(200).json({
      users: userWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(errorHandler(500, "Failed to fetch users"));
  }
};
