import { Router } from "express";
import { getRepository } from "typeorm";
import AppError from "../error/AppError";
import PatientModel from "../models/Patient";
import PatientListModel from "../models/PatientList";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const patientRouter = Router();

patientRouter.use(ensureAuthenticated());

patientRouter.post("/", async (request, response) => {
  const classRepository = getRepository(PatientModel);

  const patient = await classRepository.find({
    order: { name: "ASC" },
  });
  return response.json(patient);
});

patientRouter.get("/", async (request, response) => {
  const classRepository = getRepository(PatientListModel);
  const patient = await classRepository.find({
    where: { enable: true },
    order: { name: "ASC" },
  });
  return response.json(patient);
});

patientRouter.get("/last", async (request, response) => {
  const qtde = request.query.qtde;
  const repository = getRepository(PatientModel);

  const strSQLLimit = qtde ? `LIMIT ${qtde}` : ""

  const result = await repository.query(
    `select name, birthday, created_at from patient
    ORDER BY created_at DESC
    ${strSQLLimit}`
  );

  return response.json(result);
});

patientRouter.post("/add", async (request, response) => {
  const dataRepository = getRepository(PatientModel);

  // const cpfcnpj = request.body.cpfcnpj.replace(/\D/g, "");
  // if (
  //   cpfcnpj !== "" &&
  //   (await dataRepository.findOne({ where: { cpfcnpj } }))
  // ) {
  //   console.log("cpf ja cadastrado");
  //   return response
  //     .status(409)
  //     .send({ status: "error", message: "CPF já cadastrado" });
  // }

  const result = await dataRepository
    .save({ ...request.body })
    .catch((err: any) => {
      if (err.code === "ER_DUP_ENTRY") {
        err.message = "CNPJ ou CPF já cadastrado.";
      } else {
        console.log(err);
      }
      return response.status(500).json({
        status: "error",
        message: err.message,
      });
    });
  return response.json(result);
});

patientRouter.post("/findid", async (request, response) => {
  const { id } = request.body;
  const repository = getRepository(PatientModel);
  const patient = await repository.findOne({ id });
  return response.json(patient);
});

export default patientRouter;
