import { Request, Response } from "express";
import { db } from "../../db";
import { usersTable } from "../../db/usersSchema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export async function login(req: Request, res: Response) {
  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, req.cleanBody.email));

    if (!user) {
      res.status(400).json({ error: "Email or password is incorrect" });
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.cleanBody.password,
      user.password
    );

    if (!isPasswordCorrect) {
      res.status(400).json({ error: "Email or password is incorrect" });
      return;
    }
    // mask password before sending user
    user.password = "**********";
    const token = jwt.sign(user, "some-salt");

    res.status(200).json({ token: token, user });
  } catch (er) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function signUp(req: Request, res: Response) {
  try {
    const hashedPassword = await bcrypt.hash(req.cleanBody.password, 10);
    req.cleanBody.password = hashedPassword;
    // check if user already exists
    const [anyUserWithSameId] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, req.cleanBody.email));

    if (anyUserWithSameId) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const user = await db.insert(usersTable).values(req.cleanBody).returning();
    res.status(200).json(user);
  } catch (er) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
