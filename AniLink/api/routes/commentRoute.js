import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createComment,
  deleteComment,
  editComment,
  getPostComment,
  likeComment,
  getComment,
} from "../controller/commentController.js";

const router = express.Router();

router.post("/create",verifyToken, createComment);
router.get("/getpostcomments/:postId", getPostComment);
router.get("/getcomment", verifyToken , getComment)
router.put("/likecomment/:commentId" , verifyToken , likeComment)
router.put("/editcomment/:commentId" , verifyToken , editComment)
router.delete("/deletecomment/:commentId", verifyToken, deleteComment);


export default router