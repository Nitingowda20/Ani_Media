import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// Create a new quiz with options
export const createQuiz = async (req, res) => {
  const { question, options, correctAnswer } = req.body; // Adjust according to your request body

  try {
    const quiz = await prisma.quiz.create({
      data: {
        question,
        correctAnswer,
        options: {
          create: options.map((option) => ({ text: option })),
        },
      },
    });
    return res.status(201).json(quiz);
  } catch (error) {
    return res.status(500).json({ message: "Error creating quiz", error });
  }
};

// Get all quizzes
export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: { options: true }, // Include options when fetching quizzes
    });
    return res.status(200).json(quizzes);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching quizzes", error });
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
    return res.status(204).json({ message: "Quiz is deleted"}); // No content
  } catch (error) {
    return res.status(500).json({ message: "Error deleting quiz", error });
  }
};
