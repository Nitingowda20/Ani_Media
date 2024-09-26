import { PrismaClient } from "@prisma/client";
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

//to see like
export const likeComment = async (req, res, next) => {
  const commentId = parseInt(req.params.commentId, 10);
  const userId = parseInt(req.user.id, 10);
  // Check if commentId and userId are valid integers
  if (isNaN(commentId) || isNaN(userId)) {
    return next(errorHandler(400, "Invalid request parameters"));
  }
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      return next(errorHandler(403, "Comment not found"));
    }
    let updatedComment;
    const userIndex = comment.likes.indexOf(userId);

    if (userIndex === -1) {
      // User has not liked the comment yet, so add the userId to the likes array
      updatedComment = await prisma.comment.update({
        where: { id: commentId },
        data: {
          Numberoflikes: comment.Numberoflikes + 1,
          likes: {
            push: userId, // Push the userId into the likes array
          },
        },
      });
    } else {
      // User has already liked the comment, so remove the userId from the likes array
      const updatedLikes = comment.likes.filter((id) => id !== userId);
      updatedComment = await prisma.comment.update({
        where: { id: commentId },
        data: {
          Numberoflikes: comment.Numberoflikes - 1,
          likes: updatedLikes, // Set the likes array without the userId
        },
      });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
};

//edit comment
export const editComment = async (req, res, next) => {
  const commentId = parseInt(req.params.commentId, 10);
  const userId = parseInt(req.user.id, 10);

  if (!commentId || !userId || !req.body.content) {
    return next(errorHandler(400, "Invalid request parameters"));
  }
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      return next(errorHandler(403, "Comment not found"));
    }
    if (comment.userId !== userId && !req.user.isAdmin) {
      return next(errorHandler(403, "You are not allowed to edit"));
    }
    const editedComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: req.body.content,
      },
    });
    res.status(200).json({
      success: true,
      message: "Comment edited successfully",
      comment: editedComment,
    });
  } catch (error) {
    next(error);
  }
};
