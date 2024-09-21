import { errorHandler } from "../utils/error.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const create = async (req, res, next) => {
  const { title, content } = req.body;
  // Validate required fields
  if (!title || !content) {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }
  const slug = title
    .split(" ")
    .join("_")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "-");

  try {
    // Create new post
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        slug,
        userId: req.user.id, // Assuming the user ID is in the request object
      },
    });

    return res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};
