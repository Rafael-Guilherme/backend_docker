import PizZip from "pizzip";
import DocxTemplate from "docxtemplater";

import fs from "fs";
import path from "path";
interface IDataVariables {
  patient_name?: string;
  patient_firstName?: string;
  patient_cpfcnpj?: string;
  patient_birthday?: string;
  patient_years_old?: string;
  ability_name?: string;
  partialAbility_name?: string;
  noAbility_name?: string;
}

export default async function (
  variable: IDataVariables,
  templateName: string,
  filename: string
) {
  const content = await fs.promises.readFile(
    path.resolve(__dirname, "..", "templates", templateName)
  );

  const zip = new PizZip(content);
  const doc = new DocxTemplate(zip);

  doc.setData(variable);

  doc.render();

  const buffer = doc.getZip().generate({ type: "nodebuffer" });

  const pathfile = path.resolve(__dirname, "..", "..", "files", "tmp");

  await fs.promises.writeFile(`${pathfile}/${filename}`, buffer);
  const url = `${process.env.URL}/files/tmp/${filename}`;

  return url;
}
