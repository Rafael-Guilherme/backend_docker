import { Router } from "express";
import { getRepository } from "typeorm";

import CreateUserService from "../services/CreateUserService";
import ChangePasswordService from "../services/ChangePasswordService";
import User from "../models/User";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const usersRouter = Router();

usersRouter.get("/me", ensureAuthenticated(), async (request, response) => {
  const { id } = request.user;

  const usersRepository = getRepository(User);
  const user = await usersRepository.findOne(id);

  return response.json({
    ...user,
    password: undefined,
  });
});

usersRouter.post("/add", async (request, response) => {
  const { fullname, email, password, role } = request.body;
  const createUser = new CreateUserService();
  const user = await createUser.execute({
    fullname,
    email,
    password,
    role,
  });

  return response.json({ ...user, password: undefined });
});

usersRouter.post("/password", async (request, response) => {
  const { oldPassword, newPassword, user_id } = request.body;

  const changePassword = new ChangePasswordService();

  const user = await changePassword.execute({
    oldPassword,
    newPassword,
    user_id,
  });

  return response.json({ ...user, password: undefined });
});

export default usersRouter;
