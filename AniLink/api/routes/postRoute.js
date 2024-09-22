import express from "express";
import { create, deletePost, getpost } from "../controller/postController.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/create",verifyToken , create)
router.get("/getpost", getpost);
router.delete("/deletepost/:postId/:userId", verifyToken, deletePost);


export default router