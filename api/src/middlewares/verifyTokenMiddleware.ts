import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function verifyToken() {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get token from header
      const authHeader = req.headers["authorization"] as string | undefined;

      if (!authHeader) {
        res.status(401).json({ message: "Authorization header missing" });
        return;
      }

      const token = authHeader;
      var decoded = undefined;
      try {
        decoded = jwt.verify(token, "some-salt");
      } catch (er) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }
      console.log(decoded);
      next();
    } catch (er) {
      res.status(500).json({ error: "Something went wrong" });
    }
  };
}
