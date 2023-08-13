import { request, Router } from "express";
import { getRepository } from "typeorm";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import AppError from "../error/AppError";
import { Test } from "../models/Test";

const testRouter = Router();

testRouter.use(ensureAuthenticated());

testRouter.get("/", async (request, response) => {
  const patient_id = request.query.patient_id;
  const testRepository = getRepository(Test);

  const test = await testRepository.find({
    where: {
      patient_id: patient_id,
    },
    order: { id: "DESC" },
  });
  return response.json(test);
});

testRouter.get("/finished", async (request, response) => {
  const qtde = request.query.qtde;
  const finished = request.query.finished;
  const repository = getRepository(Test);

  const strSQLLimit = qtde ? `LIMIT ${qtde}` : "";

  let strSQLFilterFinishied = "";
  if (finished === `true` || finished === `false`) {
    strSQLFilterFinishied = `WHERE finished = ${finished}`;
  }

  const result = await repository.query(
    `SELECT test.id, type, test.created_at, test.updated_at as dateFinished,
    patient.id as patientId, patient.name, patient.birthday
    FROM test
    INNER JOIN patient on patient.id = test.patient_id
    ${strSQLFilterFinishied}
    ORDER BY test.updated_at DESC, test.id
    ${strSQLLimit}`
  );

  return response.json(result);
});

testRouter.get("/:id", async (request, response) => {
  const { id } = request.params;

  const testRepository = getRepository(Test);

  const test = await testRepository.findOne(id);

  return response.json(test);
});

testRouter.post("/", async (request, response) => {
  const { patient_id } = request.body;
  const user_id = request.user.id;

  const testRepository = getRepository(Test);

  const test = testRepository.create({
    user_id,
    patient_id,
    type: "denver",
  });

  await testRepository.save(test);

  return response.json(test);
});

testRouter.put("/:id/finish", async (request, response) => {
  const { id } = request.params;

  const testRepository = getRepository(Test);

  const test = await testRepository.findOne(id);

  if (!test) {
    throw new AppError({
      statusCode: 409,
      code: "test_not_found",
      message: "test id provided is invalid",
    });
  }

  test.finished = true;

  await testRepository.save(test);

  return response.json(test);
});

testRouter.get("/graph/acquired", async (request, response) => {
  const { id } = request.query;
  const repository = getRepository(Test);

  //Get previous Test ID from same user of test_id recived as ID
  const [resultPrevious] = await repository.query(`
    select id from test
    where
    patient_id = (select patient_id FROM test where id = '${id}')
    AND id <> '${id}'
    ORDER BY ID DESC
    LIMIT 1`);

  //If don't exist previous Test, use same ID to duplicate
  let previousId = resultPrevious !== undefined ? resultPrevious.id : id;
  let strSQL =
    resultPrevious !== undefined
      ? `sum(case when answer=3 and test_id = '${previousId}' then 1 else 0 end) as previous,
      sum(case when answer=2 and test_id = '${previousId}' then 1 else 0 end) as previousPartial`
      : "0 as previous, 0 as previousPartial";

  const result = await repository.query(
    `select level, results.domain_id, CONCAT(domain, " - Nível ", level) as domain, answers, previous, partial, previousPartial, total from
    (SELECT level, denverCompetence.id as domain_id, domain,
    sum(case when answer=3 and test_id = '${id}' then 1 else 0 end) as answers,
    sum(case when answer=2 and test_id = '${id}' then 1 else 0 end) as partial,
    ${strSQL}
    FROM testAnswer
    INNER JOIN denverAbility on denverAbility.id = testAnswer.denverAbility_id
    INNER JOIN denverCompetence on denverCompetence.id = denverAbility.denverCompetence_id
    where test_id = '${id}' or test_id = '${previousId}'
    group by denverCompetence.id) results
    INNER JOIN
    (SELECT denverCompetence.id as domain_id, count(denverAbility.id) as total
    FROM denverAbility
    INNER JOIN denverCompetence on denverCompetence.id = denverAbility.denverCompetence_id
    group by denverCompetence.id) total
    on results.domain_id = total.domain_id
    order by domain, level`
  );

  return response.json(result);
});

testRouter.get("/graph/level", async (request, response) => {
  const { id } = request.query;
  const repository = getRepository(Test);

  const result = await repository.query(`select domain,
    count(case when level='1' then answer end) as level1,
    count(case when level='2' then answer end) as level2,
    count(case when level='3' then answer end) as level3,
    count(case when level='4' then answer end) as level4
    from testAnswer
    INNER JOIN test on test.id = testAnswer.test_id
    INNER JOIN denverAbility on denverAbility.id = testAnswer.denverAbility_id
    INNER JOIN denverCompetence on denverCompetence.id = denverAbility.denverCompetence_id
    WHERE test.id = '${id}' AND answer >= 2
    GROUP BY domain, level`);

  return response.json(result);
});

export default testRouter;
