import { Router } from "express";

import aboutRoutes from "./about.routes";
import bankRoutes from "./bank.routes";
import denverCompetenceRoutes from "./denverCompetence.routes";
import denverAbilityRoutes from "./denverAbility.routes";
import expertRouter from "./expert.routes";
import patientRouter from "./patient.routes";
import reportRouter from "./report.routes";
import sessionsRouter from "./sessions.routes";
import testAnswerRouter from "./testAnswer.routes";
import testRouter from "./test.routes";
import usersRouter from "./users.routes";

const routes = Router();

routes.use("/about", aboutRoutes);
routes.use("/bank", bankRoutes);
routes.use("/denvercompetence", denverCompetenceRoutes);
routes.use("/denverability", denverAbilityRoutes);
routes.use("/expert", expertRouter);
routes.use("/patient", patientRouter);
routes.use("/report", reportRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/users", usersRouter);
routes.use("/test", testRouter);
routes.use("/testAnswer", testAnswerRouter);

export default routes;
