import { Router } from "express";
import { createChatThread } from "./chatThreadController";

import validateData from "../../middlewares/validationMiddleware";
import verifyToken from "../../middlewares/verifyTokenMiddleware";

import { createChatThreadsSchema } from "../../db/chatThreadsSchema";

const router: Router = Router();

router.post(
  "/",
  verifyToken(),
  validateData(createChatThreadsSchema),
  createChatThread
);

export default router;
