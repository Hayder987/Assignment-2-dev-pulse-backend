
import { Router } from "express";
import { authController } from "./auth.controller";
import validateUser from "./auth.validation";
import { AUTH_ACTION } from "./auth.interface";


const router = Router();

router.post("/signup", validateUser(AUTH_ACTION.register), authController.registerUser);
router.post("/login",validateUser(AUTH_ACTION.login), authController.loginUser);

export const authRouter = router;