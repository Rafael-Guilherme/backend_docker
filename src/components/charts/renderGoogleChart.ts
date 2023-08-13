import puppeteer, { ElementHandle } from "puppeteer";

import { getRenderHtml } from "./getRenderHtml";

const RENDER_TIMEOUT_MS = 5000;

export async function renderGoogleChart(contentRaw: string, optsRaw = {}) {
  const content = `const drawChart = (${contentRaw.toString()});`;

  const opts = Object.assign(
    {
      packages: ["corechart"],
      mapsApiKey: "",
      width: "100%",
      height: "100%",
    },
    optsRaw
  );

  // const browser = await puppeteer.launch({
  //   executablePath: '/usr/bin/chromium-browser'
  // })

  let browser;
  if (process.env.NODE_ENV === "production") {
    browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--proxy-server='direct://'",
        "--proxy-bypass-list=*",
      ],
      executablePath: "/usr/bin/chromium-browser",
    });
  } else {
    browser = await puppeteer.launch({
      args: ["--proxy-server='direct://'", "--proxy-bypass-list=*"],
      executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    });
  }
  
  const page = await browser.newPage();
  page.setDefaultTimeout(RENDER_TIMEOUT_MS);

  page.on("pageerror", function (err) {
    throw new Error("Error: " + err.toString());
  });

  const renderCode = getRenderHtml(content, opts);
  await page.setContent(renderCode);

  const imageBase64 = await page.evaluate(() => {
    if (!window.chart || typeof window.chart.getImageURI === "undefined") {
      return null;
    }

    return window.chart.getImageURI();
  });

  let buf: Buffer;

  if (imageBase64) {
    buf = Buffer.from(
      imageBase64.slice("data:image/png;base64,".length),
      "base64"
    );
  } else {
    const element = (await page.$("#chart_div")) as ElementHandle<Element>;

    buf = (await element.screenshot()) as Buffer;
  }

  await browser.close();

  return buf;
}
