import { Router, Request, Response } from "express";
import validateData from "../../middlewares/validationMiddleware";
import { createUserSchema, loginUserSchema } from "../../db/usersSchema";
import { login, signUp } from "./authController";
// import { login, register } from "./authController";

const router: Router = Router();

router.post("/login", validateData(loginUserSchema), login);

router.post("/signup", validateData(createUserSchema), signUp);

export default router;
