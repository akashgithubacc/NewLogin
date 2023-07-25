import express from "express";
import {
  signUpHandlers,
  logInHandlers,
  userDataHandlers,
  removeUserHandler,
  editUserHandler,
} from "../controllers/handlers.js";

const router = express.Router();

router.post("/signup", signUpHandlers);
router.post("/login", logInHandlers);
router.post("/users", userDataHandlers);
router.post("/deleting", removeUserHandler);
router.patch("/edit", editUserHandler);

export default router;
