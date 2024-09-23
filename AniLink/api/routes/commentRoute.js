import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createComment, getPostComment } from "../controller/commentController.js";

const router = express.Router();

router.post("/create",verifyToken, createComment);
router.get("/getpostcomments/:postId", getPostComment);

export default router