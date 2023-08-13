import { Router } from "express";
import { getRepository } from "typeorm";

import { DenverCompetence } from "../models/DenverCompetence";

const competenceRouter = Router();

competenceRouter.get("/", async (request, response) => {
  const repository = getRepository(DenverCompetence);
  const result = await repository.find({ order: { level: "ASC", id: "ASC" } });

  return response.json(result);
});

export default competenceRouter;
