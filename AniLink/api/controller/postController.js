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
        image: imageURL,
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
    const sortDirection = req.query.order === "asc" ? "asc" : "desc";

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
