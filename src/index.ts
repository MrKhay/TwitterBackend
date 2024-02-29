import express from "express";
import userRoutes from "./routes/userRoutes";
import tweetRoutes from "./routes/tweetRoutes";
import authRoutes from "./routes/authRouthes";
import { authenticateToken } from "./middlewares/authMiddlewear";

//
const app = express();
app.use(express.json());
app.use("/user", authenticateToken, userRoutes);
app.use("/tweet", authenticateToken, tweetRoutes);
app.use("/auth", authRoutes);

// listen and serve
app.listen(3000, () => {
  console.log("Server ready at localhost:3000");
});
