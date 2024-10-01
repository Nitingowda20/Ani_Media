import { PrismaClient } from "@prisma/client";
import { errorHandler } from "../utils/error.js";
const prisma = new PrismaClient();

//save a post to the savelist
export const savePost = async (req, res, next) => {
  try {
    const { userId, postId } = req.body;

    const existingSave = await prisma.savelist.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });
    if (existingSave) {
      return res.status(400).json({ message: "Post is already saved" });
    }

    const savedPost = await prisma.savelist.create({
      data: { userId, postId },
    });
    res.status(200).json({ message: "Post saved successfully", savedPost });
  } catch (error) {
    next(errorHandler(403, "Unable to save post"));
  }
};

// Remove a saved post from the savelist
export const unsavePost = async (req, res, next) => {
  try {
    const { userId, postId } = req.body;

    // Check if the post is already saved by the user
    const existingSave = await prisma.savelist.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    if (!existingSave) {
      return res.status(400).json({ message: "Post is not saved" });
    }
    // Remove the saved post
    await prisma.savelist.delete({
      where: { userId_postId: { userId, postId } },
    });

    res.status(200).json({ message: "Post removed from savelist" });
  } catch (error) {
    next(errorHandler(500, "Failed to remove post from savelist"));
  }
};

// Fetch all saved posts for a user
export const getSavedPosts = async (req, res, next) => {
  try {
    const { userId } = req.query;

    // Get the list of saved posts by the user
    const savedPosts = await prisma.savelist.findMany({
      where: { userId: parseInt(userId) },
      include: { post: true }, // Include post data
    });

    res.status(200).json(savedPosts);
  } catch (error) {
    next(errorHandler(500, "Failed to fetch saved posts"));
  }
};

//check if post is saved by a particular user
export const checkSavedPost = async (req, res) => {
  const { postId, userId } = req.query;

  try {
    const savedPost = await prisma.savelist.findFirst({
      where: {
        postId: parseInt(postId), // Ensure postId is an integer
        userId: parseInt(userId), // Ensure userId is an integer
      },
    });

    // Check if a record was found and return the saved status
    return res.status(200).json({ isSaved: !!savedPost });
  } catch (error) {
    console.error("Error checking saved status:", error);
    return res.status(500).json({ message: "Error checking saved status." });
  }
};


