import { Router } from "express";
import { getRepository } from "typeorm";

import AppError from "../error/AppError";
import { Test } from "../models/Test";
import { TestAnswer } from "../models/TestAnswer";

const testAnswerRouter = Router();

testAnswerRouter.get("/", async (request, response) => {
  const { test_id, patientId } = request.query;

  const repository = getRepository(TestAnswer);

  const result =
    await repository.query(`SELECT testAnswer.id, domain, name, description, answer, denverCompetence_id, level, denverAbility_id, intervention
  FROM testAnswer
  INNER join denverAbility on denverAbility.id = testAnswer.denverAbility_id
  INNER join denverCompetence on denverCompetence.id = denverAbility.denverCompetence_id
  INNER JOIN test on test.id = testAnswer.test_id
  where test_id = ${test_id} AND patient_id = '${patientId}'
  order by denverCompetence_id, denverAbility_id`);

  return response.json(result);
});

testAnswerRouter.post("/", async (request, response) => {
  const { test_id, questions } = request.body as {
    test_id: number;
    questions: any[];
  };

  const testRepository = getRepository(Test);
  const testAnswerRepository = getRepository(TestAnswer);

  const test = await testRepository.findOne(test_id);

  if (test.finished) {
    throw new AppError({
      statusCode: 409,
      code: "test.finished",
      message: "Test already finished, you cannot answer this test",
    });
  }

  const testAnswers = await Promise.all(
    questions.map(async (questions) => {
      const { answer, question_id: denverAbility_id } = questions;

      const testAnswer = await testAnswerRepository.findOne({
        where: {
          denverAbility_id,
          test_id,
        },
      });

      return testAnswerRepository.create({
        ...testAnswer,
        test_id,
        denverAbility_id,
        answer,
      });
    })
  );

  await testAnswerRepository.save(testAnswers);

  return response.status(204).send();
});

testAnswerRouter.delete("/", async (request, response) => {
  const { test_id, denverAbility_id } = request.query;
  const repository = getRepository(TestAnswer);

  const result = await repository.query(
    `DELETE from testAnswer where test_id = '${test_id}' AND denverAbility_id IN (${denverAbility_id});`
  );

  return response.json(result);
});

export default testAnswerRouter;
