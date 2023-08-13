import fs from "fs";
import { getRepository } from "typeorm";
import path from "path";

import Model from "../../../models/Patient";
import { renderGoogleChart } from "../renderGoogleChart";
import { GraphChart } from "../templates/Graph";

export async function generateGraph(patient_id: string, test_id: string) {
  const repository = getRepository(Model);

  const result = await repository.query(
    `select level, results.domain_id, domain, answers, partial, total from
    (SELECT level, denverCompetence.id as domain_id, domain,
    sum(case when answer=3 and test_id = '${test_id}' then 1 else 0 end) as answers,
    sum(case when answer=2 and test_id = '${test_id}' then 1 else 0 end) as partial
    FROM testAnswer
    INNER JOIN denverAbility on denverAbility.id = testAnswer.denverAbility_id
    INNER JOIN denverCompetence on denverCompetence.id = denverAbility.denverCompetence_id
    where test_id = '${test_id}'
    group by denverCompetence.id) results
    INNER JOIN
    (SELECT denverCompetence.id as domain_id, count(denverAbility.id) as total
    FROM denverAbility
    INNER JOIN denverCompetence on denverCompetence.id = denverAbility.denverCompetence_id
    group by denverCompetence.id) total
    on results.domain_id = total.domain_id
    order by domain, level`
  );

  const arrayData = [["Domínio", "Esperado", "Adquirido", "Adquirido Parcial"]];

  result.forEach((keys: any) => {
    let row = [];
    row.push(`${keys.domain} - Nível ${keys.level}`, Number(keys.total));
    row.push(Number(keys.answers), Number(keys.partial));
    arrayData.push(row);
  });

  const imageBuff = await renderGoogleChart(GraphChart(arrayData));

  const pathFile = path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "files",
    "chart"
  );

  await fs.promises.mkdir(`${pathFile}/${patient_id}`, { recursive: true });
  await fs.promises.writeFile(`${pathFile}/${patient_id}/graph.png`, imageBuff);
  await fs.promises.writeFile(`${pathFile}/graph.png`, imageBuff); //Create here for use with Word
}

export default generateGraph;
