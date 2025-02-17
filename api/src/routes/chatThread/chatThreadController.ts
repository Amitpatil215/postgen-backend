import { Request, Response } from "express";
import { chatThreadsTable } from "../../db/chatThreadsSchema";
import { db } from "../../db/index";

export async function createChatThread(req: Request, res: Response) {
  try {
    req.cleanBody.user_id = req.userId;
    const [thread] = await db
      .insert(chatThreadsTable)
      .values(req.cleanBody)
      .returning();
    res.status(200).json(thread);
  } catch (er) {
    res.status(500).json(er);
  }
}
