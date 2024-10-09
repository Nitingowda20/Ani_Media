import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// Create a new quiz with options
export const createQuiz = async (req, res) => {
  const { question, options, correctAnswer, topicId } = req.body;

  try {
    const quiz = await prisma.quiz.create({
      data: {
        question,
        options: {
          create: options.map((option) => ({
            text: option,
          })),
        },
        correctAnswer,
        topic: { connect: { id: parseInt(topicId) } }, // Parse topicId to ensure it's an integer
      },
    });
    return res.json(quiz);
  } catch (error) {
    console.error("Error creating quiz:", error); // Log full error details
    return res
      .status(500)
      .json({ error: "Failed to create quiz", details: error.message });
  }
};

// Get all quizzes
export const getQuizzes = async (req, res) => {
  const { topicId } = req.query;

  try {
    const quizzes = await prisma.quiz.findMany({
      where: {
        topicId: topicId ? Number(topicId) : undefined, // Filter by topicId if provided
      },
      include: {
        options: true,
        topic: true, // Include topic information if needed
      },
    });
    return res.json({ quizzes });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return res.status(500).json({ error: "Failed to load quizzes" });
  }
};

// Get a single quiz by ID
export const getQuizById = async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: Number(id) },
      include: { options: true }, // Include options when fetching a single quiz
    });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    return res.status(200).json(quiz);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching quiz", error });
  }
};

// Update a quiz
export const updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { question, options, correctAnswer } = req.body;

  try {
    const updatedQuiz = await prisma.quiz.update({
      where: { id: Number(id) },
      data: {
        question,
        correctAnswer,
        options: {
          deleteMany: {}, // Delete existing options
          create: options.map((option) => ({ text: option })), // Create new options
        },
      },
      include: { options: true }, // Include updated options
    });
    return res.status(200).json(updatedQuiz);
  } catch (error) {
    return res.status(500).json({ message: "Error updating quiz", error });
  }
};

// Delete a quiz
export const deleteQuiz = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.quiz.delete({
      where: { id: Number(id) },
    });
    return res.status(204).json({ message: "Quiz is deleted" }); // No content
  } catch (error) {
    return res.status(500).json({ message: "Error deleting quiz", error });
  }
};
//quizbytopic
export const getQuizzesByTopic = async (req, res) => {
  const { topicId } = req.params;

  try {
    // Ensure topicId is a number if using it as a number
    const quizzes = await prisma.quiz.findMany({
      where: { topicId: Number(topicId) }, // Assuming topicId is stored as a number in the database
    });
    return res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return res.status(500).json({ error: "Failed to fetch quizzes" });
  }
};