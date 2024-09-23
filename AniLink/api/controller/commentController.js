import { PrismaClient} from "@prisma/client";
import { errorHandler } from "../utils/error.js";
const prisma = new PrismaClient();

export const createComment = async (req, res, next) => {
  try {
    const { content, userId, postId } = req.body;
    if (userId !== req.user.id) {
      return next(
        errorHandler(403, "You are not allowed to comment on this post")
      );
    }
    const newComment = await prisma.comment.create({
      data: {
        content,
        userId,
        postId: parseInt(postId, 10),
      },
    });
    return res
      .status(201)
      .json({ message: "Post created successfully", comment: newComment });
  } catch (error) {
    next(error);
  }
};

//to get all comments on post
export const getPostComment = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: parseInt(postId),
      },
      orderBy: {
        createdAt: "desc", // Sort comments by most recent
      },
    });

    // Return the comments
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    next(error); // Pass error to error handler middleware
  }
};

