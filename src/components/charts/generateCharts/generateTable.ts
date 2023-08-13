import fs from "fs";
import { getRepository } from "typeorm";
import path from "path";

import Model from "../../../models/Patient";
import { renderGoogleChart } from "../renderGoogleChart";
import { TableChart } from "../templates/Table";

export async function generateTable(patient_id: string, test_id: string) {
  const repository = getRepository(Model);

  const data = await repository.query(`select domain,
  count(case when level='1' then answer end) as level1,
  count(case when level='2' then answer end) as level2,
  count(case when level='3' then answer end) as level3,
  count(case when level='4' then answer end) as level4
  from testAnswer
  INNER JOIN test on test.id = testAnswer.test_id
  INNER JOIN denverAbility on denverAbility.id = testAnswer.denverAbility_id
  INNER JOIN denverCompetence on denverCompetence.id = denverAbility.denverCompetence_id
  WHERE test.id = '${test_id}' AND answer >= 2
  GROUP BY domain, level`);

  const arrayData = [
    [
      "Domínio",
      "Nível 1 (1a - 1a 6 meses)",
      "Nível 2 (1a 6 meses - 2a)",
      "Nível 3 (2a - 3a)",
      "Nível 4 (3a - 4a)",
    ],
  ];

  data.forEach((keys) => {
    const level1 = keys.level1 > 0 ? "✓" : "O";
    const level2 = keys.level2 > 0 ? "✓" : "O";
    const level3 = keys.level3 > 0 ? "✓" : "O";
    const level4 = keys.level4 > 0 ? "✓" : "O";
    arrayData.push([keys.domain, level1, level2, level3, level4]);
  });

  const imageBuff = await renderGoogleChart(TableChart(arrayData), {
    packages: ["table"],
    height: "350",
    width: "730",
  });

  const pathFile = path.resolve(__dirname, "..", "..", "..", "..", "files", "chart");

  await fs.promises.mkdir(`${pathFile}/${patient_id}`, { recursive: true });
  await fs.promises.writeFile(`${pathFile}/${patient_id}/table.png`, imageBuff);
  await fs.promises.writeFile(`${pathFile}/table.png`, imageBuff); //Create here for use with Word
}

export default generateTable;
