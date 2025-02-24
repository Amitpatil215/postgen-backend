import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import _ from "lodash";

export default function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      // Only keep the valid data and strip out other keys from object
      req.cleanBody = _.pick(req.body, Object.keys(schema.shape));
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.issues.map((issue) => ({
          message: `${issue.path.join(".")} ${issue.message}`,
        }));
        res
          .status(400)
          .json({ error: "Invalid Data Passed", details: errorMessage });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
