import express from "express";
import { updateUser, user , deleteUser ,signout, getuser, getUser} from "../controller/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/user", user);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signout);
router.get("/getuser",verifyToken, getuser);
router.get("/:userId", getUser);



export default router;
