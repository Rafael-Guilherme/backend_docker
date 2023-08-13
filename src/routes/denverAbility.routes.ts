import { Router } from "express";
import { getRepository } from "typeorm";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import { DenverAbility } from "../models/DenverAbility";

const denverAbilityRouter = Router();

type AbilityQueryResult = Array<{
  level: string;
  competence_id: number;
  denverAbility_id: number;
  description: string;
  domain: string;
  name: string;
}>;

denverAbilityRouter.use(ensureAuthenticated());

denverAbilityRouter.get("/", async (request, response) => {
  const repository = getRepository(DenverAbility);

  const result: AbilityQueryResult = await repository.query(
    `SELECT denverCompetence.domain, denverCompetence.level, denverCompetence.id as competence_id, denverAbility.id as denverAbility_id, name, description
    from denverAbility
    INNER JOIN denverCompetence on denverCompetence.id = denverAbility.denverCompetence_id`
  );

  const competences = [];

  result.forEach((ability) => {
    const competenceIndex = competences.findIndex(
      (competences) => competences.id === ability.competence_id
    );

    if (competenceIndex < 0) {
      competences.push({
        id: ability.competence_id,
        title: ability.domain,
        level: Number(ability.level),
        abilities: [
          {
            id: ability.denverAbility_id,
            name: ability.name,
            description: ability.description,
          },
        ],
      });

      return;
    }

    const competence = competences[competenceIndex];

    competence.abilities.push({
      id: ability.denverAbility_id,
      name: ability.name,
      description: ability.description,
    });

    competences[competenceIndex] = competence;
  });

  return response.json(competences);
});

denverAbilityRouter.post("/findid", async (request, response) => {
  const { id = 0 } = request.body;
  const repository = getRepository(DenverAbility);

  const result = await repository.query(
    `SELECT denverCompetence.domain, denverAbility.id as denverAbility_id, name, description
    from denverAbility
    INNER JOIN denverCompetence on denverCompetence.id = denverAbility.denverCompetence_id
    WHERE denverCompetence.id = ${id}
    `
  );
  return response.json(result);
});

export default denverAbilityRouter;
