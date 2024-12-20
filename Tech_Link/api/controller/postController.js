import { errorHandler } from "../utils/error.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//To create the post
export const create = async (req, res, next) => {
  const { title, content, category, imageURL } = req.body;
  // Validate required fields
  if (!title || !content) {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }
  const defaultImageURL =
    "data:image/jpeg;base64,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"; // Replace this with your actual default image URL
  const finalImageURL = imageURL || defaultImageURL;

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
        category,
        image: finalImageURL,
        userId: req.user.id, // Assuming the user ID is in the request object
      },
    });

    return res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    next(error);
  }
};

//To get the post
export const getpost = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    // const sortDirection = req.query.order === "asc" ? "asc" : "desc";
    const sortDirection = req.query.sort === "asc" ? "asc" : "desc";

    const whereClause = {
      ...(req.query.userId && { userId: parseInt(req.query.userId) }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { id: parseInt(req.query.postId) }),
      ...(req.query.searchTerm && {
        OR: [
          { title: { contains: req.query.searchTerm, mode: "insensitive" } },
          { content: { contains: req.query.searchTerm, mode: "insensitive" } },
        ],
      }),
    };

    //posts with pagination, filters, and sorting
    const posts = await prisma.post.findMany({
      where: whereClause,
      orderBy: { updatedAt: sortDirection },
      skip: startIndex,
      take: limit,
    });

    //total number of posts
    const totalPosts = await prisma.post.count();

    // Calculate date for one month ago
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    // Fetch number of posts created in the last month
    const lastMonthPosts = await prisma.post.count({
      where: { createdAt: { gte: oneMonthAgo } },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(errorHandler(500, "Failed to fetch posts"));
  }
};

//Deleting post
export const deletePost = async (req, res, next) => {
  const userIdFromParams = parseInt(req.params.userId, 10); // Convert ID to integer
  const userIdFromToken = parseInt(req.user.id, 10); // Ensure user.id is an integer

  if (!req.user.isAdmin || userIdFromParams !== userIdFromToken) {
    return next(errorHandler(403, "You are not allowed to delete this post"));
  }
  const { postId } = req.params;
  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });
    return res
      .status(200)
      .json({ message: "Post deleted successfully", post: deletedPost });
  } catch (error) {
    next(error);
  }
};

//Updating a post
export const updatepost = async (req, res, next) => {
  const userIdFromParams = parseInt(req.params.userId, 10); // Convert ID to integer
  const userIdFromToken = parseInt(req.user.id, 10); // Ensure user.id is an integer


  if (!req.user.isAdmin || userIdFromParams !== userIdFromToken) {
    return next(errorHandler(403, "You are not allowed to update this post"));
  }
  const { postId } = req.params;

  try {
    const updatingPost = await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        image: req.body.image,
      },
    });
    res
      .status(200)
      .json({ message: "Post updated successfully", post: updatingPost });
  } catch (error) {
    next(error);
  }
};

//like the post
export const likePost = async (req, res, next) => {
  const postId = parseInt(req.params.postId, 10);
  const userId = parseInt(req.user.id, 10);
  // Check if postId and userId are valid integers
  if (isNaN(postId) || isNaN(userId)) {
    return next(errorHandler(400, "Invalid request parameters"));
  }
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        likes: true, // Include the likes relation
      },
    });
    if (!post) {
      return next(errorHandler(403, "post not found"));
    }
    let updatedPost;
    // const userIndex = post.likes.indexOf(userId);
    const userIndex = post.likes.map((user) => user.id).indexOf(userId);
    // console.log(userIndex);

    if (userIndex === -1) {
      // User has not liked the post yet, so add the userId to the likes array
      updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
          Numberoflikes: post.Numberoflikes + 1,
          likes: {
            connect: { id: userId }, // Push the userId into the likes array
          },
        },
      });
    } else {
      // User has already liked the post, so remove the userId from the likes array
      updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
          Numberoflikes: post.Numberoflikes - 1,
          likes: {
            disconnect: { id: userId }, // Set the likes array without the userId
          },
        },
      });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};
