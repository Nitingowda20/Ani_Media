import express from "express";
import {
  create,
  deletePost,
  getpost,
  likePost,
  updatepost,
} from "../controller/postController.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getpost", getpost);
router.delete("/deletepost/:postId/:userId", verifyToken, deletePost);
router.put("/updatepost/:postId/:userId", verifyToken, updatepost);

//
router.put("/likepost/:postId", verifyToken, likePost);

export default router;
