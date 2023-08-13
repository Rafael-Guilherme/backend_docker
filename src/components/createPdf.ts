import fs from "fs";
import path from "path";

const PdfPrinter = require("pdfmake");

const pathFonts = path.resolve(__dirname, "..", "..", "assets", "fonts");
const fonts = {
  Roboto: {
    normal: `${pathFonts}/Roboto-Regular.ttf`,
    bold: `${pathFonts}/Roboto-Medium.ttf`,
    italics: `${pathFonts}/Roboto-Italic.ttf`,
    bolditalics: `${pathFonts}/Roboto-MediumItalic.ttf`,
  },
};
const printer = new PdfPrinter(fonts);

const pathPdf = path.resolve(__dirname, "..", "..", "files");

export async function createPDF(data) {
  return new Promise((resolve, reject) => {
    fs.promises.mkdir(`${pathPdf}/pdf/`, {
      recursive: true,
    });

    const pathfile = path.resolve(__dirname, "..", "..", "assets", "images");
    const pathChart = path.resolve(__dirname, "..", "..", "files", "chart");

    const dominiosNivel1Texto = data.dominiosNivel1Concatenados.length
    ? `foi avaliado para os domínios de ${data.dominiosNivel1Concatenados} dentro do nível 1 (crianças de 1 ano - 1 ano 6 meses de idade)`
    : "não foi avaliado para nenhum domínio nível 1";

    const dominiosNivel2Texto = data.dominiosNivel2Concatenados.length
    ? `para os domínios de ${data.dominiosNivel2Concatenados} a criança foi avaliada no nível 2 (crianças de 1 ano 6 meses a 2 anos de idade)`
    : "nenhum domínio nível 2 a criança foi avaliada";

    const dominiosNivel3Texto = data.dominiosNivel3Concatenados.length
    ? `As habilidades relacionadas aos domínios de ${data.dominiosNivel3Concatenados} foram avaliadas no nível 3 (crianças de 2 a 3 anos de idade)`
    : "Nenhum domínio nível 3 foi avaliado";

    const dominiosNivel4Texto = data.dominiosNivel4Concatenados.length
    ? `as habilidades relacionadas aos domínios de ${data.dominiosNivel4Concatenados} avaliadas para o nível 4 (crianças de 3 a 6 anos de idade)`
    : "nenhum domínio de nível 4 foi avaliado";

    const habilidadesNivel1Texto = data.habilidadesNivel1Concatenados.length
    ? `apresenta habilidades adquiridas para crianças até 1 ano e 6 meses de idade nos domínios de ${data.habilidadesNivel1Concatenados}` : ``;

    const habilidadesNivel2Texto = data.habilidadesNivel2Concatenados.length
    ? `e apresenta habilidades adquiridas para crianças 2 anos de idade nos domínios de ${data.habilidadesNivel2Concatenados}` : ``;

    const habilidadesNivel3Texto = data.habilidadesNivel3Concatenados.length
    ? `apresenta habilidades adquiridas para crianças de até 3 anos de idade nos domínios de ${data.habilidadesNivel3Concatenados}` : ``;

    const habilidadesNivel4Texto = data.habilidadesNivel4Concatenados.length
    ? `e habilidades adquiridas para crianças de até 6 anos de idade nos domínios de ${data.habilidadesNivel4Concatenados}` : ``;

    const comunicacaoReceptivaAdquirida = (data.competenciasAdquiridasUm[0] || data.competenciasAdquiridasDois[0]) ? `${data.competenciasAdquiridasUm[0]}\n ${data.competenciasAdquiridasDois[0]}` : '';
    const comunicacaoReceptivaNaoAdquirida = (data.competenciasNaoAdquiridasUm[0] || data.competenciasNaoAdquiridasDois[0]) ? `${data.competenciasNaoAdquiridasUm[0]}\n ${data.competenciasNaoAdquiridasDois[0]}` : '';

    const comunicacaoExpressivaAdquirida = (data.competenciasAdquiridasUm[1] || data.competenciasAdquiridasDois[1]) ? `${data.competenciasAdquiridasUm[1]}\n ${data.competenciasAdquiridasDois[1]}` : '';
    const comunicacaoExpressivaNaoAdquirida = (data.competenciasNaoAdquiridasUm[1] || data.competenciasNaoAdquiridasDois[1]) ? `${data.competenciasNaoAdquiridasUm[1]}\n ${data.competenciasNaoAdquiridasDois[1]}` : '';

    const competenciasSociaisAdquirida = (data.competenciasAdquiridasUm[2] || data.competenciasAdquiridasDois[2]) ? `${data.competenciasAdquiridasUm[2]}\n ${data.competenciasAdquiridasDois[2]}` : '';
    const competenciasSociaisNaoAdquirida = (data.competenciasNaoAdquiridasUm[2] || data.competenciasNaoAdquiridasDois[2]) ? `${data.competenciasNaoAdquiridasUm[2]}\n ${data.competenciasNaoAdquiridasDois[2]}` : '';

    const comportamentoAdquirida = (data.competenciasAdquiridasUm[8] || data.competenciasAdquiridasDois[8]) ? `${data.competenciasAdquiridasUm[8]}\n ${data.competenciasAdquiridasDois[8]}` : '';
    const comportamentoNaoAdquirida = (data.competenciasNaoAdquiridasUm[8] || data.competenciasNaoAdquiridasDois[8]) ? `${data.competenciasNaoAdquiridasUm[8]}\n ${data.competenciasNaoAdquiridasDois[8]}` : '';

    const atencaoCompartilhadaAdquirida = (data.competenciasAdquiridasUm[6] || data.competenciasAdquiridasDois[6]) ? `${data.competenciasAdquiridasUm[6]}\n ${data.competenciasAdquiridasDois[6]}` : '';
    const atencaoCompartilhadaNaoAdquirida = (data.competenciasNaoAdquiridasUm[6] || data.competenciasNaoAdquiridasDois[6]) ? `${data.competenciasNaoAdquiridasUm[6]}\n ${data.competenciasNaoAdquiridasDois[6]}` : '';

    const imitacaoAdquirida = (data.competenciasAdquiridasUm[9] || data.competenciasAdquiridasDois[9]) ? `${data.competenciasAdquiridasUm[9]}\n ${data.competenciasAdquiridasDois[9]}` : '';
    const imitacaoNaoAdquirida = (data.competenciasNaoAdquiridasUm[9] || data.competenciasNaoAdquiridasDois[9]) ? `${data.competenciasNaoAdquiridasUm[9]}\n ${data.competenciasNaoAdquiridasDois[9]}` : '';

    const jogoAdquirida = (data.competenciasAdquiridasUm[14] || data.competenciasAdquiridasDois[14]) ? `${data.competenciasAdquiridasUm[14]}\n ${data.competenciasAdquiridasDois[14]}` : '';
    const jogoNaoAdquirida = (data.competenciasNaoAdquiridasUm[14] || data.competenciasNaoAdquiridasDois[14]) ? `${data.competenciasNaoAdquiridasUm[14]}\n ${data.competenciasNaoAdquiridasDois[14]}` : '';

    const cognicaoAdquirida = (data.competenciasAdquiridasUm[7] || data.competenciasAdquiridasDois[7]) ? `${data.competenciasAdquiridasUm[7]}\n ${data.competenciasAdquiridasDois[7]}` : '';
    const cognicaoNaoAdquirida = (data.competenciasNaoAdquiridasUm[7] || data.competenciasNaoAdquiridasDois[7]) ? `${data.competenciasNaoAdquiridasUm[7]}\n ${data.competenciasNaoAdquiridasDois[7]}` : '';

    const motricidadeFinaAdquirida = (data.competenciasAdquiridasUm[17] || data.competenciasAdquiridasDois[17]) ? `${data.competenciasAdquiridasUm[17]}\n ${data.competenciasAdquiridasDois[17]}` : '';
    const motricidadeFinaNaoAdquirida = (data.competenciasNaoAdquiridasUm[17] || data.competenciasNaoAdquiridasDois[17]) ? `${data.competenciasNaoAdquiridasUm[17]}\n ${data.competenciasNaoAdquiridasDois[17]}` : '';

    const motricidadeGrossaAdquirida = (data.competenciasAdquiridasUm[18] || data.competenciasAdquiridasDois[18]) ? `${data.competenciasAdquiridasUm[18]}\n ${data.competenciasAdquiridasDois[18]}` : '';
    const motricidadeGrossaNaoAdquirida = (data.competenciasNaoAdquiridasUm[18] || data.competenciasNaoAdquiridasDois[18]) ? `${data.competenciasNaoAdquiridasUm[18]}\n ${data.competenciasNaoAdquiridasDois[18]}` : '';

    const independenciaPessoalAdquirida = (data.competenciasAdquiridasUm[10] || data.competenciasAdquiridasDois[10]) ? `${data.competenciasAdquiridasUm[10]}\n ${data.competenciasAdquiridasDois[10]}` : '';
    const independenciaPessoalNaoAdquirida = (data.competenciasNaoAdquiridasUm[10] || data.competenciasNaoAdquiridasDois[10]) ? `${data.competenciasNaoAdquiridasUm[10]}\n ${data.competenciasNaoAdquiridasDois[10]}` : '';

    const docDefinition = {
      header: {
        margin: [0, 0, 0, 0],
        image: `${pathfile}/header.jpg`,
        width: 150,
        style: ["header"],
      },
      footer: {
        text: [
          `R.  Frei José de Monte Carmelo, 538
          (19) 3238-7175 | (19)971191336
          secretaria@socialmentes.com.br`
        ],
        margin: [0, 0, 0, 10],
        alignment: "center",
        fontSize: 10,
      },
      content: [
        {
          text: "", // Elemento vazio para criar o espaço
          margin: [0, 20, 0, 0], // Define o espaçamento superior de 20 pontos
        },
        {
          text: [
            `\u200B\t\t\tRELATÓRIO AVALIAÇÃO NEURODESENVOLVIMENTO\n\n\n`,
          ],
          style: "title",
        },
        {
          text: `\u200B\t\t\t\tDADOS IDENTIFICAÇÃO\n\n`,
          bold: true,
        },
        {
          text: [
            `\u200B\t\t\tNome: ${data.name}
            \u200B\t\t\tData Nascimento: ${data.birthday}                     				Idade: ${data.years_old}
            \u200B\t\t\tPeríodo da aplicação do Programa: ${data.dateStart} a ${data.dateEnd}
            \u200B\t\t\tPeríodo da avaliação: \n\n`,
          ],
          style: "body",
        },
        {
          text: [
            {
              text: `\u200B\t\t\tHISTÓRICO\n\n`,
              bold: true,
            },
            `\u200B\t\t\tOs dados da anamnese foram fornecidos pelos ${data.parent}. ${data.firstName} é fruto de uma gestação ${data.gestacao}. Gestação mostrou-se ${data.gestacaomostrou}. ${data.gestacaoNote}.
            \u200B\t\t\tPeríodo de amamentação ocorreu ${data.amamentacao}. ${data.observacaoamamentacao + "."} Introdução alimentar ocorreu ${data.alimentacao}. Criança ${data.alimentacaoAceitacao} variedades de frutas, legumes e texturas. ${data.alimentacaoNote + "."}
            \u200B\t\t\tAquisição das habilidades motoras como se sentar, engatinhar e andar ocorreram ${data.motora} para a idade. Desfralde diurno (e noturno) ${data.desfraudediurno + ","} ${"com" + data.obsdesfraldediurno + "anos"}, e desfralde noturno ${data.desfraldenoturno}. ${data.obsdesfraldenoturno + "."}
            \u200B\t\t\tEm relação as brincadeiras, ${data.name} ${data.brinquedo} funcional de brinquedos e jogos. Habilidade para jogo simbólico apresenta-se ${data.jogosimbolico} para a idade.
            \u200B\t\t\tA aquisição das habilidades sociais encontra-se ${data.sociais} para a sua idade.
            \u200B\t\t\tDemonstra habilidades adquiridas para:
            ${data.autonomias}
            \u200B\t\t\tTem dificuldades quando se faz necessário:
            ${data.autonomiasDificuldades}.
            \u200B\t\t\tAquisição das habilidades de fala e linguagem mostram-se ${data.linguagem} para a idade.
            \u200B\t\t\tDemonstra habilidades adquiridas para:
            ${data.habilidades}
            \u200B\t\t\tTem dificuldades quando se faz necessário:
            ${data.habilidadesDificuldades}.\n\n`,

            `\u200B\t\t\tPOSSIVEIS COMENTÁRIOS REFERENTE A HABILIDADE DE BRINCAR DA CRIANÇA:
            ${data.habilidadesBrincarNotes}
            \u200B\t\t\t${data.habilidadebrincar}\n\n`,

            `\u200B\t\t\tOBSERVAÇÕES REFERENTE AS HABILIDADES SOCIAIS E EMOCIONAIS:
            ${data.habilidadesSociaisNotes}
            \u200B\t\t\t${data.habilidadessociais}\n\n`,

            `\u200B\t\t\tOBSERVAÇÕES REFERENTE AS HABILIDADES FALA E LINGUAGEM
            ${data.habilidadesFalaELinguaguemNotes}
            \u200B\t\t\t${data.habilidadesfalaelinguagem}\n\n`
          ],
          style: "body",
        },
        {
          text: `\u200B\t\t\t\t\t\tRECURSOS UTILIZADOS \n`,
          bold: true,
        },
        {
          text: [
            `\u200B\t\t\t\t\t•	Checklist Currículo Modelo Denver de Intervenção Precoce. \n\n`,
          ],
          style: "body",
        },
        {
          text: `\u200B\t\t\t\t\t\tDADOS AVALIAÇÃO`,
          bold: true,
        },
        {
          text: [
            `\u200B\t\t\t\tO Modelo Denver de Intervenção Precoce foi desenvolvido para ensinar repertório comportamental, de forma intensiva, para bebês e crianças que apresentam déficits nas repostas sociais e de interação.
            \u200B\t\t\t\tEsse método de trabalho é indicado para bebês de 12 meses a crianças de 5 anos de idade e tem como objetivo reduzir os sintomas do quadro de autismo e acelerar a aprendizagem de respostas adequadas ao convívio social.
            \u200B\t\t\t\tA avaliação é baseada no preenchimento de um checklist que identifica as habilidades adquiridas nos domínios de: (a) comunicação receptiva (CR); (b) comunicação expressiva (CE); (c) competências sociais (CS); (d) comportamento (CO); (e) atenção compartilhada (AC); (f) imitação (IM); (g) jogo (JO); (h) cognição (CO); (i) motricidade fina (MF); (j) motricidade grossa (MG); (k) independência pessoal (IP), de acordo com a idade da criança.
            \u200B\t\t\t\t${data.firstName} ${dominiosNivel1Texto}; ${dominiosNivel2Texto}. ${dominiosNivel3Texto} e ${dominiosNivel4Texto}.
            \u200B\t\t\t\tOs dados obtidos em sessões de observação com a criança são apresentados no gráfico abaixo.
            \u200B\t\t\t\tAs barras em rosa claro demonstram o número de habilidades esperada em cada domínio avaliado. As barras sinalizadas em azul apresentam o repertório adquirida pela criança (habilidades executadas com independência e de forma consistente) e as sinalizadas em rosa escuro as habilidades em processo de aquisição (habilidades executadas com auxílio ou de forma inconsistente).
            `,
          ],
          style: "body",
        },
        {
          margin: [0, 0, 0, 0],
          image: `${pathChart}/${data.patient_id}/graph.png`,
          width: 500,
        },
        {
          text:
            `\u200B\t\t\t\tO quadro abaixo apresenta algumas das habilidades adquiridas pela criança e àquelas que encontram-se com dificuldade nos diversos domínios avaliados.\n\n`,
        },
        {
          table: {
            widths: [60, "*", "*"],
            body: [
              ["DOMÍNIO", "HABILIDADE ADQUIRIDA/PARCIAL", "HABILIDADE NÃO ADQUIRIDA"],
              ["CR", `${comunicacaoReceptivaAdquirida}`, `${comunicacaoReceptivaNaoAdquirida}`], // Linha 1
              ["CE", `${comunicacaoExpressivaAdquirida}`, `${comunicacaoExpressivaNaoAdquirida}`], // Linha 2
              ["CS", `${competenciasSociaisAdquirida}`, `${competenciasSociaisNaoAdquirida}`], // Linha 3
              ["CO", `${comportamentoAdquirida}`, `${comportamentoNaoAdquirida}`], // Linha 4
              ["AC", `${atencaoCompartilhadaAdquirida}`, `${atencaoCompartilhadaNaoAdquirida}`], // Linha 5
              ["IM", `${imitacaoAdquirida}`, `${imitacaoNaoAdquirida}`], // Linha 6
              ["JO", `${jogoAdquirida}`, `${jogoNaoAdquirida}`], // Linha 7
              ["CO", `${cognicaoAdquirida}`, `${cognicaoNaoAdquirida}`], // Linha 8
              ["MF", `${motricidadeFinaAdquirida}`, `${motricidadeFinaNaoAdquirida}`], // Linha 9
              ["MG", `${motricidadeGrossaAdquirida}`, `${motricidadeGrossaNaoAdquirida}`], // Linha 10
              ["IP", `${independenciaPessoalAdquirida}`, `${independenciaPessoalNaoAdquirida}`], // Linha 11
            ],
            style: {
              header: {
                bold: true,
                fontSize: 12,
                marginBottom: 10,
              },
            },
          },
        },
        {
          text: "",
          margin: [0, 10],
        },
        {
          text: `\u200B\t\t\t\t\tCONCLUSÃO`,
          bold: true,
        },
        {
          text: [
            `\u200B\t\t\tAs habilidades do neurodesenvolvimento avaliadas pelo Checklist Currículo Denver demonstram que ${data.firstName} ${habilidadesNivel1Texto} ${habilidadesNivel2Texto}.
            \u200B\t\t\t${data.firstName} ${habilidadesNivel3Texto} ${habilidadesNivel4Texto}.
            \u200B\t\t\tA avaliação das habilidades sociais e afetivas demonstram que ${data.firstName} demonstra dificuldade em:
            ${data.habilidadesSociaisDificuldades}.
            \u200B\t\t\tTais habilidades são essenciais para a aprendizagem social e convívio em grupo e são responsáveis pelos atrasos observados no repertório de desenvolvimento da criança.
            \u200B\t\t\tO Modelo Denver de Intervenção Precoce é uma estratégia de tratamento para crianças que apresentam atraso na aquisição das habilidades cognitivas com risco ou diagnóstico de TEA.
            \u200B\t\t\tDiversos estudos sugerem que a análise aplicada do comportamento naturalística como forma de tratamento para os sintomas de autismo favorece a aprendizagem de respostas sociais, de comunicação e linguagem.
            \u200B\t\t\tABA naturalístico faz uso de estratégias motivacionais que: (a) usam incentivos diretamente relacionados as respostas a serem ensinadas para a criança; (b) utilizam as escolhas da criança nas oportunidades de ensino; (c) intercala tarefas adquiridas com aquelas em fase de aquisição; (d) reforça tentativas da criança para executar as atividades; (e) usa atividades com alto valor motivacional e (f) controla materiais e ambientes na interação com a criança.
            \u200B\t\t\tO tratamento proposto é intensivo e deve seguir um plano de atividades com metas das habilidades a serem desenvolvidas junto à criança e sua família.
            \u200B\t\t\tDessa maneira, sugere-se para Francisco Intervenção baseada no Modelo Denver de Intervenção Precoce para crianças com autismo (ABA Naturalístico).\n\n`
          ],
          style: "body",
        },
        {
          text: `\u200B\t\t\t\tENCAMINHAMENTOS \n\n`,
          bold: true,
        },
        {
          text: `\u200B\t\t\t\tModelo Denver de Intervenção Precoce em Crianças com Autismo, ${data.hours} horas por semana.`
        },
        {
          margin: [0, 0, 0, 0],
          image: `${pathfile}/signature.jpg`,
          width: 150,
          style: ["signature"],
        },
      ],
      pageSize: "A4",
      pageMargins: [25, 70, 25, 60],
      styles: {
        header: {
          margin: [25, 10, 25, 5],
          width: 150,
          alignment: "center",
        },
        title: {
          margin: [30, 0, 30, 0],
          fontSize: 14,
          bold: true,
          alignment: "center",
        },
        body: {
          margin: [25, 10, 25, 0],
          fontSize: 12,
          lineHeight: 1.5,
          bold: false,
          alignment: "justify",
        },
        signature: {
          margin: [0, 0, 0, 0],
          alignment: "center",
        },
        // footer: {
        //   margin: [0, 0, 30, 0],
        //   fontSize: 10,
        //   bold: true,
        //   alignment: "justify",
        // },
      },
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const pathPdfFile = `pdf/${data?.name.trim().replace(/ /g, "_")}.pdf`;
    const stream = fs.createWriteStream(
      `${pathPdf}/pdf/${data?.name.trim().replace(/ /g, "_")}.pdf`
    );
    pdfDoc.pipe(stream);
    pdfDoc.end();

    stream.on("finish", () => {
      const url = `${process.env.URL}/files/${pathPdfFile}`;
      resolve(url);
    });

    stream.on("error", (err) => {
      reject(err);
    });
  })
}
