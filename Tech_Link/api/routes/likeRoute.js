import express from "express";

import { verifyToken } from "../utils/verifyUser.js";
import { checkIfLiked, likePost } from "../controller/likeController.js";
const router = express.Router();

router.put("/likepost/:postId", verifyToken, likePost);
router.get("/check", checkIfLiked);


export default router;
