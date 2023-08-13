import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import http from "http";
import https from "https";
import fs from "fs";
import path from "path";

import "./database";
import routes from "./routes";
import AppError from "./error/AppError";

const app = express();

// const corsOptions = {
//   origin: "https://software-socialmentes-frontend.vercel.app",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   "preflightContinue": false,
//   "optionsSuccessStatus": 204,
//   credentials: true,
// };

app.use(cors());
app.use(
  express.json({
    limit: "20mb",
    type: [
      "application/json",
      "text/plain", // AWS sends this content-type for its messages/notifications
    ],
  })
);
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
//app.use(express.json({limit: '30mb'}));
const filesFolder = path.resolve(__dirname, "..", "files");
app.use("/files", express.static(filesFolder));

app.use("/api", routes);

app.use("/hello", (request, response) => {
  response.write('Hello World, Rafael')
  response.end()
})

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      statusCode: err.statusCode,
      code: err.code,
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    error: true,
    code: "internal.error",
    message: "Internal server error",
  });
});

const port = process.env.PORT || 443;
if (port === 443) {
  // const PATH_CERTIFICATE = "./etc/letsencrypt/live/backend.socialmentes.net";

  // const privateKey = fs.readFileSync(`${PATH_CERTIFICATE}/key.pem`, "utf8");
  // const certificate = fs.readFileSync(`${PATH_CERTIFICATE}/cert.pem`, "utf8");
  // //const ca = fs.readFileSync(`${PATH_CERTIFICATE}/chain.pem`, "utf8");

  // const credentials = {
  //   key: privateKey,
  //   cert: certificate,
  //   //ca: ca,
  // };

  //Starting both http & https servers
  const httpServer = http.createServer(app);
  //const httpsServer = https.createServer(credentials, app);

  httpServer.listen(3000, () => {
    console.log("HTTP Server running on port 3000");
  });

  // httpsServer.listen(port, () => {
  //   console.log(`HTTPS Server running on port ${port}`);
  // });
} else {
const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log(`HTTP Server running on port ${port}`);
});
console.log(Date());
}
