import { Router } from "express";
import {
  createPersona,
  deletePersona,
  getPersonaById,
  listPersonas,
  updatePersona,
} from "./personasController";
import validateData from "../../middlewares/validationMiddleware";

import {
  createPersonasSchema,
  updatePersonasSchema,
} from "../../db/personasSchema";
import verifyToken from "../../middlewares/verifyTokenMiddleware";

const router: Router = Router();

router.get("/", verifyToken(), listPersonas);
router.get("/:id", getPersonaById);
router.post(
  "/",
  verifyToken(),
  validateData(createPersonasSchema),
  createPersona
);
router.put("/:id", validateData(updatePersonasSchema), updatePersona);
router.delete("/:id", deletePersona);

export default router;
