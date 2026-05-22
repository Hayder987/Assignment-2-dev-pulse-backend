
import { Router } from "express";
import { authController } from "./auth.controller";
import validateUser from "./auth.validation";

const router = Router();

router.post("/signup", validateUser, authController.registerUser);
router.post("/login", authController.loginUser);

export const authRouter = router;