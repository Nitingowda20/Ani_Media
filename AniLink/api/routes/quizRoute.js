import express from "express";
import { verifyToken } from "../utils/verifyUser.js"; // Ensure this is the correct path
import { createQuiz, deleteQuiz, getQuizById, getQuizzes, getQuizzesByTopic, updateQuiz } from "../controller/quizController.js";

const router = express.Router();

router.post("/createquiz", verifyToken, createQuiz);
router.get("/getquizzes", getQuizzes);
router.get("/getquizbyid/:id", getQuizById);
router.put("/updatequiz/:id", verifyToken, updateQuiz);
router.delete("/deletequiz/:id", verifyToken, deleteQuiz);
// router.post("/createquiz", createQuiz);
router.get("/getquizzes/:topicId", getQuizzesByTopic);


export default router;
