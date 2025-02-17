import { Router } from "express";
import { createNewChat, listChats } from "./chatController";

import validateData from "../../middlewares/validationMiddleware";
import verifyToken from "../../middlewares/verifyTokenMiddleware";

import { createChatSchema } from "../../db/chatsSchema";

const router: Router = Router();

router.post(
  "/:thread_id",
  verifyToken(),
  validateData(createChatSchema),
  createNewChat
);

router.get("/:thread_id", verifyToken(), listChats);

export default router;
