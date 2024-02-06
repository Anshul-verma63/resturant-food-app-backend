import express from "express";

import { isUser } from "../middleware/authMiddleware.js";
import {
  createCategoryController,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../controllers/categoryControler.js";

const router = express.Router();

//create cat
router.post("/category/create", isUser, createCategoryController);

//get cat
router.get("/get-categories", getAllCategory);

//update cat
router.put("/update-category/:id", updateCategory);

//delete cat
router.delete("/delete-category/:id", deleteCategory);
export default router;
