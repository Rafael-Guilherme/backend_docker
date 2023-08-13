import { Router } from "express";
import { getRepository } from "typeorm";
import { format } from "date-fns";

import PatientModel from "../models/Patient";
import ReportSavedModel from "../models/ReportSaved";
import fileGenerator from "../components/fileGenerator";
import formatterAge from "../components/formatterAge";

import { generateChats } from "../components/charts/generateCharts";
import { createPDF } from "../components/createPdf";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const reportRouter = Router();

reportRouter.use(ensureAuthenticated());

reportRouter.post("/avaliacao", async (request, response) => {
  const {
    patient_id,
    test_id,
    hability,
    habilityNote,
    diaper,
    diaperNight,
    diaperNote,
    detailsDomain,
    testNote,
    testDomainNote,
    conclusionNote,
    hours,
    assessment1,
    assessment2,
    assessment3,
    assessment4,
    assessment5,
    assessment6,
    assessment7,
    assessment8,
    assessment9,
    assessment10,
    assessmentDificult1,
    assessmentDificult2,
    assessmentDificult3,
    assessmentDificult4,
    assessmentDificult5,
    assessmentDificult6,
    assessmentDificult7,
    assessmentDificult8,
    assessmentDificult9,
    assessmentDificult10,
    ...rest
  } = request.body;

  await generateChats(patient_id, test_id);

  const queryRunner = getRepository(PatientModel);

  //Save for reload page / history
  const answersSaved = getRepository(ReportSavedModel);
  const answers = answersSaved.create({
    test_id: Number(test_id),
    answers: { ...request.body },
  });
  await answersSaved.save(answers).catch((err: any) => {
    console.log(err);
  });
  ////

  const [resultPatient] = await queryRunner.query(
    `SELECT name, birthday from patient where id = '${patient_id}'`
  );

  const [resultTest] = await queryRunner.query(
    `SELECT created_at, updated_at FROM test where id = '${test_id}'`
  );

  const birthday = format(resultPatient.birthday, "dd/MM/yyyy");
  const years_old = formatterAge.date.yearsOldWithMonth(resultPatient.birthday);
  let firstName = resultPatient.name.split(" ")[0];
  firstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  const dateStart = format(resultTest.created_at, "dd/MM/yyyy");
  const dateEnd = format(resultTest.updated_at, "dd/MM/yyyy");

  let autonomias = "";
  autonomias += rest.autonomia1 ? `\u200B\t\t\t• ${rest.autonomia1}\n` : "";
  autonomias += rest.autonomia2 ? `\u200B\t\t\t• ${rest.autonomia2}\n` : "";
  autonomias += rest.autonomia3 ? `\u200B\t\t\t• ${rest.autonomia3}\n` : "";
  autonomias += rest.autonomia4 ? `\u200B\t\t\t• ${rest.autonomia4}\n` : "";
  autonomias += rest.autonomia5 ? `\u200B\t\t\t• ${rest.autonomia5}\n` : "";
  autonomias += rest.autonomia6 ? `\u200B\t\t\t• ${rest.autonomia6}\n` : "";
  autonomias += rest.autonomia7 ? `\u200B\t\t\t• ${rest.autonomia7}\n` : "";
  autonomias += rest.autonomia8 ? `\u200B\t\t\t• ${rest.autonomia8}\n` : "";
  autonomias += rest.autonomia9 ? `\u200B\t\t\t• ${rest.autonomia9}\n` : "";
  autonomias += rest.autonomia10 ? `\u200B\t\t\t• ${rest.autonomia10}\n` : "";

  let autonomiasDificuldades = "";
  autonomiasDificuldades += rest.autonomiaDificuldades1 ? `\u200B\t\t\t• ${rest.autonomiaDificuldades1}\n` : "";
  autonomiasDificuldades += rest.autonomiaDificuldades2 ? `\u200B\t\t\t• ${rest.autonomiaDificuldades2}\n` : "";
  autonomiasDificuldades += rest.autonomiaDificuldades3 ? `\u200B\t\t\t• ${rest.autonomiaDificuldades3}\n` : "";
  autonomiasDificuldades += rest.autonomiaDificuldades4 ? `\u200B\t\t\t• ${rest.autonomiaDificuldades4}\n` : "";
  autonomiasDificuldades += rest.autonomiaDificuldades5 ? `\u200B\t\t\t• ${rest.autonomiaDificuldades5}\n` : "";
  autonomiasDificuldades += rest.autonomiaDificuldades6 ? `\u200B\t\t\t• ${rest.autonomiaDificuldades6}\n` : "";
  autonomiasDificuldades += rest.autonomiaDificuldades7 ? `\u200B\t\t\t• ${rest.autonomiaDificuldades7}\n` : "";
  autonomiasDificuldades += rest.autonomiaDificuldades8 ? `\u200B\t\t\t• ${rest.autonomiaDificuldades8}\n` : "";
  autonomiasDificuldades += rest.autonomiaDificuldades9 ? `\u200B\t\t\t• ${rest.autonomiaDificuldades9}\n` : "";
  autonomiasDificuldades += rest.autonomiaDificuldades10 ? `\u200B\t\t\t• ${rest.autonomiaDificuldades10}\n` : "";

  let habilidades = "";
  habilidades += rest.habilidade1 ? `\u200B\t\t\t• ${rest.habilidade1}\n` : "";
  habilidades += rest.habilidade2 ? `\u200B\t\t\t• ${rest.habilidade2}\n` : "";
  habilidades += rest.habilidade3 ? `\u200B\t\t\t• ${rest.habilidade3}\n` : "";
  habilidades += rest.habilidade4 ? `\u200B\t\t\t• ${rest.habilidade4}\n` : "";
  habilidades += rest.habilidade5 ? `\u200B\t\t\t• ${rest.habilidade5}\n` : "";
  habilidades += rest.habilidade6 ? `\u200B\t\t\t• ${rest.habilidade6}\n` : "";
  habilidades += rest.habilidade7 ? `\u200B\t\t\t• ${rest.habilidade7}\n` : "";

  let habilidadesDificuldades = "";
  habilidadesDificuldades += rest.habilidadeDificuldade1 ? `\u200B\t\t\t• ${rest.habilidadeDificuldade1}\n` : "";
  habilidadesDificuldades += rest.habilidadeDificuldade2 ? `\u200B\t\t\t• ${rest.habilidadeDificuldade2}\n` : "";
  habilidadesDificuldades += rest.habilidadeDificuldade3 ? `\u200B\t\t\t• ${rest.habilidadeDificuldade3}\n` : "";
  habilidadesDificuldades += rest.habilidadeDificuldade4 ? `\u200B\t\t\t• ${rest.habilidadeDificuldade4}\n` : "";
  habilidadesDificuldades += rest.habilidadeDificuldade5 ? `\u200B\t\t\t• ${rest.habilidadeDificuldade5}\n` : "";
  habilidadesDificuldades += rest.habilidadeDificuldade6 ? `\u200B\t\t\t• ${rest.habilidadeDificuldade6}\n` : "";
  habilidadesDificuldades += rest.habilidadeDificuldade7 ? `\u200B\t\t\t• ${rest.habilidadeDificuldade7}\n` : "";

  let habilidadesBrincarNotes = "";
  habilidadesBrincarNotes += rest.habilidadebrincarNote1 ? `\u200B\t\t\t• ${rest.habilidadebrincarNote1}\n` : "";
  habilidadesBrincarNotes += rest.habilidadebrincarNote2 ? `\u200B\t\t\t• ${rest.habilidadebrincarNote2}\n` : "";
  habilidadesBrincarNotes += rest.habilidadebrincarNote3 ? `\u200B\t\t\t• ${rest.habilidadebrincarNote3}\n` : "";
  habilidadesBrincarNotes += rest.habilidadebrincarNote4 ? `\u200B\t\t\t• ${rest.habilidadebrincarNote4}\n` : "";
  habilidadesBrincarNotes += rest.habilidadebrincarNote5 ? `\u200B\t\t\t• ${rest.habilidadebrincarNote5}\n` : "";
  habilidadesBrincarNotes += rest.habilidadebrincarNote6 ? `\u200B\t\t\t• ${rest.habilidadebrincarNote6}\n` : "";
  habilidadesBrincarNotes += rest.habilidadebrincarNote7 ? `\u200B\t\t\t• ${rest.habilidadebrincarNote7}\n` : "";
  habilidadesBrincarNotes += rest.habilidadebrincarNote8 ? `\u200B\t\t\t• ${rest.habilidadebrincarNote8}\n` : "";
  habilidadesBrincarNotes += rest.habilidadebrincarNote9 ? `\u200B\t\t\t• ${rest.habilidadebrincarNote9}\n` : "";
  habilidadesBrincarNotes += rest.habilidadebrincarNote10 ? `\u200B\t\t\t• ${rest.habilidadebrincarNote10}\n` : "";
  habilidadesBrincarNotes += rest.habilidadebrincarNote11 ? `\u200B\t\t\t• ${rest.habilidadebrincarNote11}\n` : "";
  habilidadesBrincarNotes += rest.habilidadebrincarNote12 ? `\u200B\t\t\t• ${rest.habilidadebrincarNote12}\n` : "";

  let habilidadesSociaisNotes = "";
  habilidadesSociaisNotes += rest.habilidadessociaisNote1 ? `\u200B\t\t\t• ${rest.habilidadessociaisNote1}\n` : "";
  habilidadesSociaisNotes += rest.habilidadessociaisNote2 ? `\u200B\t\t\t• ${rest.habilidadessociaisNote2}\n` : "";
  habilidadesSociaisNotes += rest.habilidadessociaisNote3 ? `\u200B\t\t\t• ${rest.habilidadessociaisNote3}\n` : "";
  habilidadesSociaisNotes += rest.habilidadessociaisNote4 ? `\u200B\t\t\t• ${rest.habilidadessociaisNote4}\n` : "";
  habilidadesSociaisNotes += rest.habilidadessociaisNote5 ? `\u200B\t\t\t• ${rest.habilidadessociaisNote5}\n` : "";
  habilidadesSociaisNotes += rest.habilidadessociaisNote6 ? `\u200B\t\t\t• ${rest.habilidadessociaisNote6}\n` : "";

  let habilidadesFalaELinguaguemNotes = "";
  habilidadesFalaELinguaguemNotes += rest.habilidadesfalaelinguagemNote1 ? `\u200B\t\t\t• ${rest.habilidadesfalaelinguagemNote1}\n` : "";
  habilidadesFalaELinguaguemNotes += rest.habilidadesfalaelinguagemNote2 ? `\u200B\t\t\t• ${rest.habilidadesfalaelinguagemNote2}\n` : "";
  habilidadesFalaELinguaguemNotes += rest.habilidadesfalaelinguagemNote3 ? `\u200B\t\t\t• ${rest.habilidadesfalaelinguagemNote3}\n` : "";
  habilidadesFalaELinguaguemNotes += rest.habilidadesfalaelinguagemNote4 ? `\u200B\t\t\t• ${rest.habilidadesfalaelinguagemNote4}\n` : "";
  habilidadesFalaELinguaguemNotes += rest.habilidadesfalaelinguagemNote5 ? `\u200B\t\t\t• ${rest.habilidadesfalaelinguagemNote5}\n` : "";
  habilidadesFalaELinguaguemNotes += rest.habilidadesfalaelinguagemNote6 ? `\u200B\t\t\t• ${rest.habilidadesfalaelinguagemNote6}\n` : "";

  let dominiosNivel1 = [];
  dominiosNivel1.push(rest.dominionivel11 ? rest.dominionivel11 : "");
  dominiosNivel1.push(rest.dominionivel12 ? rest.dominionivel12 : "");
  dominiosNivel1.push(rest.dominionivel13 ? rest.dominionivel13 : "");
  dominiosNivel1.push(rest.dominionivel14 ? rest.dominionivel14 : "");
  dominiosNivel1.push(rest.dominionivel15 ? rest.dominionivel15 : "");
  dominiosNivel1.push(rest.dominionivel16 ? rest.dominionivel16 : "");
  dominiosNivel1.push(rest.dominionivel17 ? rest.dominionivel17 : "");
  dominiosNivel1.push(rest.dominionivel18 ? rest.dominionivel18 : "");
  dominiosNivel1.push(rest.dominionivel19 ? rest.dominionivel19 : "");
  dominiosNivel1.push(rest.dominionivel110 ? rest.dominionivel110 : "");

  dominiosNivel1 = dominiosNivel1.filter(dominio => dominio !== "");

  const dominiosNivel1Concatenados = dominiosNivel1.join(", ");

  let dominiosNivel2 = [];
  dominiosNivel2.push(rest.dominionivel21 ? rest.dominionivel21 : "");
  dominiosNivel2.push(rest.dominionivel22 ? rest.dominionivel22 : "");
  dominiosNivel2.push(rest.dominionivel23 ? rest.dominionivel23 : "");
  dominiosNivel2.push(rest.dominionivel24 ? rest.dominionivel24 : "");
  dominiosNivel2.push(rest.dominionivel25 ? rest.dominionivel25 : "");
  dominiosNivel2.push(rest.dominionivel26 ? rest.dominionivel26 : "");
  dominiosNivel2.push(rest.dominionivel27 ? rest.dominionivel27 : "");
  dominiosNivel2.push(rest.dominionivel28 ? rest.dominionivel28 : "");
  dominiosNivel2.push(rest.dominionivel29 ? rest.dominionivel29 : "");
  dominiosNivel2.push(rest.dominionivel210 ? rest.dominionivel210 : "");
  dominiosNivel2.push(rest.dominionivel211 ? rest.dominionivel211 : "");
  dominiosNivel2.push(rest.dominionivel212 ? rest.dominionivel212 : "");

  dominiosNivel2 = dominiosNivel2.filter(dominio => dominio !== "");

  const dominiosNivel2Concatenados = dominiosNivel2.join(", ");

  let dominiosNivel3 = [];
  dominiosNivel3.push(rest.dominionivel31 ? rest.dominionivel31 : "");
  dominiosNivel3.push(rest.dominionivel32 ? rest.dominionivel32 : "");
  dominiosNivel3.push(rest.dominionivel33 ? rest.dominionivel33 : "");
  dominiosNivel3.push(rest.dominionivel34 ? rest.dominionivel34 : "");
  dominiosNivel3.push(rest.dominionivel35 ? rest.dominionivel35 : "");
  dominiosNivel3.push(rest.dominionivel36 ? rest.dominionivel36 : "");
  dominiosNivel3.push(rest.dominionivel37 ? rest.dominionivel37 : "");
  dominiosNivel3.push(rest.dominionivel38 ? rest.dominionivel38 : "");

  dominiosNivel3 = dominiosNivel3.filter(dominio => dominio !== "");

  const dominiosNivel3Concatenados = dominiosNivel3.join(", ");

  let dominiosNivel4 = [];
  dominiosNivel4.push(rest.dominionivel41 ? rest.dominionivel41 : "");
  dominiosNivel4.push(rest.dominionivel42 ? rest.dominionivel42 : "");
  dominiosNivel4.push(rest.dominionivel43 ? rest.dominionivel43 : "");
  dominiosNivel4.push(rest.dominionivel44 ? rest.dominionivel44 : "");
  dominiosNivel4.push(rest.dominionivel45 ? rest.dominionivel45 : "");
  dominiosNivel4.push(rest.dominionivel46 ? rest.dominionivel46 : "");
  dominiosNivel4.push(rest.dominionivel47 ? rest.dominionivel47 : "");
  dominiosNivel4.push(rest.dominionivel48 ? rest.dominionivel48 : "");

  dominiosNivel4 = dominiosNivel4.filter(dominio => dominio !== "");

  const dominiosNivel4Concatenados = dominiosNivel4.join(", ");

  let habilidadesNivel1 = [];
  habilidadesNivel1.push(rest.habilidadenivel11 ? rest.habilidadenivel11 : "");
  habilidadesNivel1.push(rest.habilidadenivel12 ? rest.habilidadenivel12 : "");
  habilidadesNivel1.push(rest.habilidadenivel13 ? rest.habilidadenivel13 : "");
  habilidadesNivel1.push(rest.habilidadenivel14 ? rest.habilidadenivel14 : "");
  habilidadesNivel1.push(rest.habilidadenivel15 ? rest.habilidadenivel15 : "");
  habilidadesNivel1.push(rest.habilidadenivel16 ? rest.habilidadenivel16 : "");
  habilidadesNivel1.push(rest.habilidadenivel17 ? rest.habilidadenivel17 : "");
  habilidadesNivel1.push(rest.habilidadenivel18 ? rest.habilidadenivel18 : "");
  habilidadesNivel1.push(rest.habilidadenivel19 ? rest.habilidadenivel19 : "");
  habilidadesNivel1.push(rest.habilidadenivel110 ? rest.habilidadenivel110 : "");

  habilidadesNivel1 = habilidadesNivel1.filter(dominio => dominio !== "");

  const habilidadesNivel1Concatenados = habilidadesNivel1.join(", ");

  let habilidadesNivel2 = [];
  habilidadesNivel2.push(rest.habilidadenivel21 ? rest.habilidadenivel21 : "");
  habilidadesNivel2.push(rest.habilidadenivel22 ? rest.habilidadenivel22 : "");
  habilidadesNivel2.push(rest.habilidadenivel23 ? rest.habilidadenivel23 : "");
  habilidadesNivel2.push(rest.habilidadenivel24 ? rest.habilidadenivel24 : "");
  habilidadesNivel2.push(rest.habilidadenivel25 ? rest.habilidadenivel25 : "");
  habilidadesNivel2.push(rest.habilidadenivel26 ? rest.habilidadenivel26 : "");
  habilidadesNivel2.push(rest.habilidadenivel27 ? rest.habilidadenivel27 : "");
  habilidadesNivel2.push(rest.habilidadenivel28 ? rest.habilidadenivel28 : "");
  habilidadesNivel2.push(rest.habilidadenivel29 ? rest.habilidadenivel29 : "");
  habilidadesNivel2.push(rest.habilidadenivel210 ? rest.habilidadenivel210 : "");
  habilidadesNivel2.push(rest.habilidadenivel211 ? rest.habilidadenivel211 : "");
  habilidadesNivel2.push(rest.habilidadenivel212 ? rest.habilidadenivel212 : "");

  habilidadesNivel2 = habilidadesNivel2.filter(dominio => dominio !== "");

  const habilidadesNivel2Concatenados = habilidadesNivel2.join(", ");

  let habilidadesNivel3 = [];
  habilidadesNivel3.push(rest.habilidadenivel31 ? rest.habilidadenivel31 : "");
  habilidadesNivel3.push(rest.habilidadenivel32 ? rest.habilidadenivel32 : "");
  habilidadesNivel3.push(rest.habilidadenivel33 ? rest.habilidadenivel33 : "");
  habilidadesNivel3.push(rest.habilidadenivel34 ? rest.habilidadenivel34 : "");
  habilidadesNivel3.push(rest.habilidadenivel35 ? rest.habilidadenivel35 : "");
  habilidadesNivel3.push(rest.habilidadenivel36 ? rest.habilidadenivel36 : "");
  habilidadesNivel3.push(rest.habilidadenivel37 ? rest.habilidadenivel37 : "");
  habilidadesNivel3.push(rest.habilidadenivel38 ? rest.habilidadenivel38 : "");

  habilidadesNivel3 = habilidadesNivel3.filter(dominio => dominio !== "");

  const habilidadesNivel3Concatenados = habilidadesNivel3.join(", ");

  let habilidadesNivel4 = [];
  habilidadesNivel4.push(rest.habilidadenivel41 ? rest.habilidadenivel41 : "");
  habilidadesNivel4.push(rest.habilidadenivel42 ? rest.habilidadenivel42 : "");
  habilidadesNivel4.push(rest.habilidadenivel43 ? rest.habilidadenivel43 : "");
  habilidadesNivel4.push(rest.habilidadenivel44 ? rest.habilidadenivel44 : "");
  habilidadesNivel4.push(rest.habilidadenivel45 ? rest.habilidadenivel45 : "");
  habilidadesNivel4.push(rest.habilidadenivel46 ? rest.habilidadenivel46 : "");
  habilidadesNivel4.push(rest.habilidadenivel47 ? rest.habilidadenivel47 : "");
  habilidadesNivel4.push(rest.habilidadenivel48 ? rest.habilidadenivel48 : "");

  habilidadesNivel4 = habilidadesNivel4.filter(dominio => dominio !== "");

  const habilidadesNivel4Concatenados = habilidadesNivel4.join(", ");

  const indicesReceptiva = [1, 14, 28, 38];
  const indicesExpresiva = [2, 15, 29, 39];
  const indicesSociais = [3, 40];
  const indicesSociaisPares = 18;
  const indicesSociaisAdultosEPares = 30;
  const indicesSociaisAdultosOuPares = 17;
  const atencaoConjunta = 16;
  const cognicao = [5, 20, 31, 41];
  const comportamento = 9;
  const imitacao = [4, 19];
  const independenciaPessoal = [10, 25, 35, 45];
  const independenciaHigiene = [12, 27, 36];
  const independenciaTarefas = [13, 37];
  const independenciaVestir = [11, 26];
  const jogo = [6, 21, 32, 42];
  const jogoIndependente = 22;
  const motricidadeFina = [7, 23, 33, 43];
  const motricidadeGrossa = [8, 24, 34, 44];

  const indexSets = [
    { indices: indicesReceptiva },
    { indices: indicesExpresiva },
    { indices: indicesSociais },
    { indices: [indicesSociaisPares] },
    { indices: [indicesSociaisAdultosEPares] },
    { indices: [indicesSociaisAdultosOuPares] },
    { indices: [atencaoConjunta] },
    { indices: cognicao },
    { indices: [comportamento] },
    { indices: imitacao },
    { indices: independenciaPessoal },
    { indices: independenciaHigiene },
    { indices: independenciaTarefas },
    { indices: independenciaVestir  },
    { indices: jogo },
    { indices: [jogoIndependente]  },
    { indices: motricidadeFina },
    { indices: motricidadeGrossa }
  ];

  const competenciasAdquiridasUm = [];

  for (let i = 1; i <= 45; i++) {
    const fieldName = `adquiridaUm${i}`;
    const fieldValue = rest[fieldName];

    indexSets.forEach(({ indices }) => {
      if (indices.includes(i) && fieldValue !== undefined) {
        competenciasAdquiridasUm.push(fieldValue);
      }
    });
  }

  const competenciasAdquiridasDois = [];

  for (let i = 1; i <= 45; i++) {
    const fieldName = `adquiridaDois${i}`;
    const fieldValue = rest[fieldName];

    indexSets.forEach(({ indices }) => {
      if (indices.includes(i) && fieldValue !== undefined) {
        competenciasAdquiridasDois.push(fieldValue);
      }
    });
  }

  const competenciasNaoAdquiridasUm = [];

  for (let i = 1; i <= 45; i++) {
    const fieldName = `naoAdquiridaUm${i}`;
    const fieldValue = rest[fieldName];

    indexSets.forEach(({ indices }) => {
      if (indices.includes(i) && fieldValue !== undefined) {
        competenciasNaoAdquiridasUm.push(fieldValue);
      }
    });
  }

  const competenciasNaoAdquiridasDois = [];

  for (let i = 1; i <= 45; i++) {
    const fieldName = `naoAdquiridaDois${i}`;
    const fieldValue = rest[fieldName];

    indexSets.forEach(({ indices }) => {
      if (indices.includes(i) && fieldValue !== undefined) {
        competenciasNaoAdquiridasDois.push(fieldValue);
      }
    });
  }

  let habilidadesSociaisDificuldades = "";
  habilidadesSociaisDificuldades += rest.habilidadessociaisdificuldade1
    ? `\u200B\t\t\t• ${rest.habilidadessociaisdificuldade1}\n`
    : "";
  habilidadesSociaisDificuldades += rest.habilidadessociaisdificuldade2
    ? `\u200B\t\t\t• ${rest.habilidadessociaisdificuldade2}\n`
    : "";
  habilidadesSociaisDificuldades += rest.habilidadessociaisdificuldade3
    ? `\u200B\t\t\t• ${rest.habilidadessociaisdificuldade3}\n`
    : "";
  habilidadesSociaisDificuldades += rest.habilidadessociaisdificuldade4
    ? `\u200B\t\t\t• ${rest.habilidadessociaisdificuldade4}\n`
    : "";
  habilidadesSociaisDificuldades += rest.habilidadessociaisdificuldade5
    ? `\u200B\t\t\t• ${rest.habilidadessociaisdificuldade5}\n`
    : "";
  habilidadesSociaisDificuldades += rest.habilidadessociaisdificuldade6
    ? `\u200B\t\t\t• ${rest.habilidadessociaisdificuldade6}\n`
    : "";
  habilidadesSociaisDificuldades += rest.habilidadessociaisdificuldade7
    ? `\u200B\t\t\t• ${rest.habilidadessociaisdificuldade7}\n`
    : "";
  habilidadesSociaisDificuldades += rest.habilidadessociaisdificuldade8
    ? `\u200B\t\t\t• ${rest.habilidadessociaisdificuldade8}\n`
    : "";
  habilidadesSociaisDificuldades += rest.habilidadessociaisdificuldade9
    ? `\u200B\t\t\t• ${rest.habilidadessociaisdificuldade9}\n`
    : "";
  habilidadesSociaisDificuldades += rest.habilidadessociaisdificuldade10
    ? `\u200B\t\t\t• ${rest.habilidadessociaisdificuldade10}\n`
    : "";
  habilidadesSociaisDificuldades += rest.habilidadessociaisdificuldade11
    ? `\u200B\t\t\t• ${rest.habilidadessociaisdificuldade11}\n`
    : "";
  habilidadesSociaisDificuldades += rest.habilidadessociaisdificuldade12
    ? `\u200B\t\t\t• ${rest.habilidadessociaisdificuldade12}\n`
    : "";

  const data = {
    patient_id,
    test_id,
    name: resultPatient.name,
    birthday,
    years_old,
    firstName,
    dateStart,
    dateEnd,
    habilityNote,
    diaperNote,
    detailsDomain,
    testNote,
    testDomainNote,
    conclusionNote,
    hours,
    autonomias,
    autonomiasDificuldades,
    habilidades,
    habilidadesDificuldades,
    habilidadesBrincarNotes,
    habilidadesSociaisNotes,
    habilidadesFalaELinguaguemNotes,
    dominiosNivel1Concatenados,
    dominiosNivel2Concatenados,
    dominiosNivel3Concatenados,
    dominiosNivel4Concatenados,
    competenciasAdquiridasUm,
    competenciasAdquiridasDois,
    competenciasNaoAdquiridasUm,
    competenciasNaoAdquiridasDois,
    habilidadesNivel1Concatenados,
    habilidadesNivel2Concatenados,
    habilidadesNivel3Concatenados,
    habilidadesNivel4Concatenados,
    habilidadesSociaisDificuldades,
    ...rest,
  };

  const result = await createPDF(data);

  return response.status(200).send(result);
});

reportRouter.post("/intervencao", async (request, response) => {
  const { patient_id, test_id, interventionsSelected } = request.body;
  const repository = getRepository(PatientModel);

  await generateChats(patient_id, test_id);

  const [resultPatient] = await repository.query(`SELECT
  name, cpfcnpj, birthday
  FROM patient
  WHERE id = '${patient_id}'`);

  const sqlFilter =
    interventionsSelected.length > 0
      ? `AND denverAbility.id IN (${interventionsSelected})`
      : "";

  const resultAbility =
    await repository.query(`SELECT denverAbility.id, denverAbility.name, denverAbility.description,
    domain, level FROM denverAbility
  INNER JOIN testAnswer on testAnswer.denverAbility_id = denverAbility.id
  INNER JOIN test on test.id = testAnswer.test_id
  INNER JOIN denverCompetence on denverCompetence.id = denverAbility.denverCompetence_id
  WHERE patient_id = '${patient_id}' AND test.id = '${test_id}'  ${sqlFilter} ORDER BY denverAbility.id`);

  const years_old = formatterAge.date.yearsOldWithMonth(resultPatient.birthday);
  let patient_firstName = resultPatient.name.split(" ")[0];
  patient_firstName =
    patient_firstName.charAt(0).toUpperCase() +
    patient_firstName.slice(1).toLowerCase();

  const ability = resultAbility.map((key) => {
    return {
      id: key.id,
      name: key.name,
      description: key.description,
      domain: key.domain,
      level: key.level,
    };
  });

  const result = await fileGenerator(
    {
      patient_name: resultPatient.name.trim(),
      patient_firstName: patient_firstName,
      patient_cpfcnpj: resultPatient.cpfcnpj,
      patient_birthday: format(resultPatient.birthday, "dd/MM/yyyy"),
      patient_years_old: years_old,
      ability_name: ability,
    },
    "intervencaodenver.docx",
    "intervencaodenver-" + resultPatient.name.replaceAll(/\s/g, "") + ".docx"
  );

  return response.send(result);
});

reportRouter.post("/answers", async (request, response) => {
  const { test_id } = request.body;
  const repository = getRepository(ReportSavedModel);
  const result = await repository.findOne({ test_id });
  return response.json(result);
});

export default reportRouter;
