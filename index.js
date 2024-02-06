import express from "express";
import dotenv from "dotenv";
import "colors";
import cors from "cors";
import morgan from "morgan";
import dbConnetion from "./config/dbConnet.js";
import router from "./routes/userRoutes.js";
import resturanrRouter from "./routes/resturantRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import foodRouter from "./routes/foodRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

//middlware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Wwlcome to my Resturant</h1>");
});

//listen server
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`.bgBlue);
});
app.use("/api/v1/user", router);
app.use("/api/v1/resturant", resturanrRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/food", foodRouter);

//database connection
dbConnetion();
