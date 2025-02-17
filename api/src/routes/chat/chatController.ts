import { Request, Response } from "express";
import { chatsTable } from "../../db/chatsSchema";
import { postsTable } from "../../db/postsSchema";
import { createPostsSchema } from "../../db/postsSchema";
import { db } from "../../db/index";
import { eq, and, gt } from "drizzle-orm";

export async function createNewChat(req: Request, res: Response) {
  try {
    req.cleanBody.user_id = req.userId;
    req.cleanBody.thread_id = req.params.thread_id;
    const [chat] = await db
      .insert(chatsTable)
      .values(req.cleanBody)
      .returning();

    const newPost = {
      content: "Do you know how to use Cheerful Prism?",
      user_id: req.userId,
      chat_id: chat.id,
    };

    const [post] = await db.insert(postsTable).values(newPost).returning();
    res.status(200).json({ chat, post });
  } catch (er) {
    res.status(500).json(er);
  }
}

export async function listChats(req: Request, res: Response) {
  try {
    const thread_id = req.params.thread_id;
    const user_id = req.userId;
    const since = (req.query.since ?? "") as string;

    const conditions = [
      eq(chatsTable.thread_id, thread_id),
      eq(chatsTable.user_id, user_id),
    ];

    if (since) {
      let dateSince = new Date(since);
      // Ensure dateSince is a valid date
      if (!isNaN(dateSince.getTime())) {
        conditions.push(gt(chatsTable.created_at, dateSince));
      }
    }

    const chats = await db
      .select()
      .from(chatsTable)
      .where(and(...conditions));
    res.status(200).json(chats);
  } catch (er) {
    res.status(500).json(er);
  }
}
