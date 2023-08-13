import { Router } from "express";
import { getRepository } from "typeorm";

import { generateJwtAndRefreshToken } from "../components/generateJWTAndRefreshToken";
import { addUserInformationToRequest } from "../middlewares/addUserInformationToRequest";
import User from "../models/User";
import AppError from "../error/AppError";
import { UserToken } from "../models/UserToken";

import AuthenticateUserService from "../services/AuthenticateUserService";
import { differenceInMinutes } from "date-fns";

const sessionsRouter = Router();

sessionsRouter.post("/", async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token, refreshToken } = await authenticateUser.execute({
    email,
    password,
  });

  return response.status(200).json({
    user: { ...user, password: undefined },
    token,
    refreshToken
  });
});


sessionsRouter.post(
  "/refresh",
  addUserInformationToRequest,
  async (request, response) => {
    const { refreshToken } = request.body;
    const { id } = request.user;

    const userTokenRepository = getRepository(UserToken);
    const userRepository = getRepository(User);
    const userToken = await userTokenRepository.findOne({
      token: refreshToken,
    });

    if (!userToken) {
      throw new AppError({
        code: "refreshToken.invalid",
        message: "Refresh Token invalid",
        statusCode: 401,
      })
    }

    const maxTokenValidity = 60 * 8 // 8 hours
    const userTokenTime = differenceInMinutes(
      new Date(),
      userToken.updated_at
    )

    if (userToken?.user_id === id && userTokenTime < maxTokenValidity) {
      const user = await userRepository.findOne(userToken.id);

      const { refreshToken, token } = await generateJwtAndRefreshToken(
        userToken.user_id,
        {
          role: user?.role
        },
        userToken.id
      );

      return response.json({ refreshToken, token });
    }

    throw new AppError({
      code: "refreshToken.invalid",
      message: "Refresh Token invalid",
      statusCode: 401,
    })
});

export default sessionsRouter;
