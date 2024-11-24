import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const likePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id; // Assuming `req.user` is set by `verifyToken`

  try {
    // Check if the post exists
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has already liked the post
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: parseInt(postId),
        },
      },
    });

    let updatedPost;

    if (!existingLike) {
      // User has not liked the post yet, so create a new like
      await prisma.like.create({
        data: {
          user: { connect: { id: userId } }, // Connect the user
          post: { connect: { id: parseInt(postId) } }, // Connect the post
        },
      });

      // Increment the number of likes in the post
      updatedPost = await prisma.post.update({
        where: { id: parseInt(postId) },
        data: {
          Numberoflikes: post.Numberoflikes + 1, // Increment likes
        },
      });
    } else {
      // User has already liked the post, so remove the like
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId: parseInt(postId),
          },
        },
      });

      // Decrement the number of likes in the post
      updatedPost = await prisma.post.update({
        where: { id: parseInt(postId) },
        data: {
          Numberoflikes: post.Numberoflikes - 1, // Decrement likes
        },
      });
    }

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error liking post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Add this in likeController.js

export const checkIfLiked = async (req, res) => {
  const { postId, userId } = req.query;

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        userId: parseInt(userId),
        postId: parseInt(postId),
      },
    });

    if (existingLike) {
      return res.status(200).json({ hasLiked: true });
    } else {
      return res.status(200).json({ hasLiked: false });
    }
  } catch (error) {
    console.error("Error checking like status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
