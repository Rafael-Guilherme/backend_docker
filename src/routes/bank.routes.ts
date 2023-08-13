import { Router } from "express";
import { getRepository } from "typeorm";

import { Bank } from "../models/Bank";

const banksRouter = Router();

banksRouter.get('/', async (request, response) => {
  const banksRepository = getRepository(Bank);
  const banks = await banksRepository.find({order: {name: "ASC"}});

  return response.json(banks);
})

export default banksRouter;
