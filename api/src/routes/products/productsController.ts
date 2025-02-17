import { Request, Response } from "express";
import { db } from "../../db/index";
import { productsTable } from "../../db/schema";
import { eq } from "drizzle-orm";

export async function listProducts(req: Request, res: Response) {
  try {
    const products = await db.select().from(productsTable);
    res.status(200).json(products);
  } catch (er) {
    res.status(500).json(er);
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(req.params.id)));
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json("Product not found");
    }
  } catch (er) {
    res.status(500).json(er);
  }
}

export async function createProduct(req: Request, res: Response) {
  console.log(req.cleanBody);
  try {
    const [product] = await db
      .insert(productsTable)
      .values(req.cleanBody)
      .returning();
    res.status(201).json(product);
  } catch (er) {
    res.status(500).json(er);
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const product = await db
      .update(productsTable)
      .set(req.cleanBody)
      .where(eq(productsTable.id, Number(req.params.id)))
      .returning();

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json("Product not found");
    }
  } catch (er) {
    res.status(500).json(er);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const [product] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, Number(req.params.id)))
      .returning();
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json("Product not found");
    }
  } catch (er) {
    res.status(500).json(er);
  }
}
