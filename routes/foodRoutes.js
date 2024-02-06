import express from "express";

import { isUser } from "../middleware/authMiddleware.js";
import {
  createFoodController,
  deleteFood,
  getAllFood,
  getFoodByResturant,
  getSingleFood,
  placedOrderController,
  updateFood,
  updateStatusOrder,
} from "../controllers/foodController.js";
import isAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();

//create food
router.post("/create", isUser, createFoodController);

//get food
router.get("/get-food", isUser, getAllFood);

//get food single
router.get("/get-food/:id", isUser, getSingleFood);

//get food by resturant
router.get("/resturant/get-food/:id", isUser, getFoodByResturant);

//update food
router.put("/update/food/:id", isUser, updateFood);

//delete food
router.delete("/delete/food/:id", isUser, deleteFood);

//placed odrer
router.post("/place/order", isUser, placedOrderController);

//update status odrer
router.put("/update-status/order/:id", isUser, isAdmin, updateStatusOrder);
export default router;
