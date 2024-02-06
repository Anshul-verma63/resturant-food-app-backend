import express from "express";
import {
  deleteAccountController,
  getUserController,
  resetPasswordController,
  updateUserController,
  userLoginController,
  userRegisterController,
} from "../controllers/userController.js";
import { isUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", userRegisterController);
router.post("/login", userLoginController);
router.get("/get-user", isUser, getUserController);
router.put("/update-user", isUser, updateUserController);
router.put("/reset-password", isUser, resetPasswordController);
router.delete("/delete-account/:id", isUser, deleteAccountController);

export default router;
