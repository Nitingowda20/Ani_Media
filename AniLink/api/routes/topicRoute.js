import express from "express";
import { createTopic, getTopics } from "../controller/topicController.js"; // Adjust the import based on your project structure

const router = express.Router();

router.post("/createtopic", createTopic);
router.get("/topics", getTopics);

export default router;
