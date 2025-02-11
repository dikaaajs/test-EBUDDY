import express from "express";
import {
  updateUserData,
  fetchUserData,
  createUserData,
} from "../controller/api";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from user routes");
  return;
});

router.put("/update-user-data", authMiddleware, updateUserData);

router.get("/fetch-user-data/:id", authMiddleware, fetchUserData);

router.post("/signup", createUserData);

export default router;
