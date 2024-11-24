import express from "express";
import {
  getSavedPosts,
  savePost,
  unsavePost,
  checkSavedPost,
} from "../controller/savelistController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/savepost", savePost);
router.delete("/unsave", unsavePost);
// Route to get all saved posts for a user
router.get("/getSavedPosts", verifyToken, getSavedPosts);
router.get("/check", checkSavedPost);

export default router;
