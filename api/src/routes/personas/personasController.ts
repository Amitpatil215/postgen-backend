import { Request, Response } from "express";
import { db } from "../../db/index";
import { personasTable } from "../../db/schema";
import { eq } from "drizzle-orm";

export async function listPersonas(req: Request, res: Response) {
  try {
    const personas = await db.select().from(personasTable);
    res.status(200).json(personas);
  } catch (er) {
    res.status(500).json(er);
  }
}

export async function getPersonaById(req: Request, res: Response) {
  try {
    const [persona] = await db
      .select()
      .from(personasTable)
      .where(eq(personasTable.id, req.params.id));
    if (persona) {
      res.status(200).json(persona);
    } else {
      res.status(404).json("persona not found");
    }
  } catch (er) {
    res.status(500).json(er);
  }
}

export async function createPersona(req: Request, res: Response) {
  console.log(req.cleanBody);
  req.cleanBody.user_id = req.userId;
  try {
    const [persona] = await db
      .insert(personasTable)
      .values(req.cleanBody)
      .returning();
    res.status(201).json(persona);
  } catch (er) {
    res.status(500).json(er);
  }
}

export async function updatePersona(req: Request, res: Response) {
  try {
    const persona = await db
      .update(personasTable)
      .set(req.cleanBody)
      .where(eq(personasTable.id, req.params.id))
      .returning();

    if (persona) {
      res.status(200).json(persona);
    } else {
      res.status(404).json("persona not found");
    }
  } catch (er) {
    res.status(500).json(er);
  }
}

export async function deletePersona(req: Request, res: Response) {
  try {
    const [persona] = await db
      .delete(personasTable)
      .where(eq(personasTable.id, req.params.id))
      .returning();
    if (persona) {
      res.status(200).json(persona);
    } else {
      res.status(404).json("persona not found");
    }
  } catch (er) {
    res.status(500).json(er);
  }
}
