  
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
