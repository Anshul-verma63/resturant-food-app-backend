import express from "express";

import { isUser } from "../middleware/authMiddleware.js";
import {
  createResturantController,
  deleteResturant,
  getAllResturant,
  getSingleResturant,
} from "../controllers/resturantController.js";

const router = express.Router();

//create restu
router.post("/create/resturant", isUser, createResturantController);

//get all restu
router.get("/get-resturants", isUser, getAllResturant);

//get single restu
router.get("/get-resturant/:id", isUser, getSingleResturant);

//get single restu
router.delete("/delete-resturant/:id", isUser, deleteResturant);
export default router;
