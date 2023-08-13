import { Router } from "express";
import { getRepository } from "typeorm";
import AppError from "../error/AppError";
import Model from "../models/Expert";
import ExpertListModel from "../models/ExpertList";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

interface Expert {
  name: string;
  cpfcnpj: string;
  zipcode: string;
  address: string;
  addressNumber: string;
  complement: string;
  neighborhood: string;
  city: string;
  uf: string;
  email: string;
  mobile: string;
  phone: string;
  note: string;
}

const expertRouter = Router();

expertRouter.use(ensureAuthenticated());

expertRouter.post("/", async (request, response) => {
  const expertRepository = getRepository(Model);

  const expert = await expertRepository.find({
    order: { name: "ASC" },
  });
  return response.json(expert);
});

expertRouter.get("/", async (request, response) => {
  const expertRepository = getRepository(ExpertListModel);
  const result = await expertRepository.find({
    where: { enable: true },
    order: { name: "ASC" },
  });
  return response.json(result);
});

expertRouter.post("/add", async (request, response) => {
  const expertRepository = getRepository(Model);
  const dataPlain = {
    email: request.body.email && request.body.email.trim(),
    mobile: request.body.mobile && request.body.mobile.replace(/\D/g, ""),
    rg: request.body.rg && request.body.rg.replace(/\D/g, ""),
    cpfcnpj: request.body.cpfcnpj && request.body.cpfcnpj.replace(/\D/g, ""),
    zipcode: request.body.zipcode && request.body.zipcode.replace(/\D/g, ""),
  };

  const result = await expertRepository
    .save({ ...request.body, ...dataPlain })
    .catch((err: any) => {
      if (err.code === "ER_DUP_ENTRY") {
        err.message = "CNPJ ou CPF já cadastrado.";
      }
      return response.status(500).json({
        status: "error",
        message: err.message,
      });
    });
  return response.json(result);
});

expertRouter.post("/findid", async (request, response) => {
  const { id } = request.body;
  const expertRepository = getRepository(Model);
  const result = await expertRepository.findOne({ id });
  return response.json(result);
});

expertRouter.post("/count", async (request, response) => {
  const expertRepository = getRepository(Model);
  const expert = await expertRepository.count();
  return response.json(expert);
});

export default expertRouter;
