import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { v4 as uuid } from "uuid";

import { UserToken } from "../models/UserToken";
import authConfig from "../config/auth";

export async function generateJwtAndRefreshToken(
  userId: string,
  payload: object = {},
  refreshTokenId?: number
) {
  const { expiresIn, secret } = authConfig.jwt;
  const userTokenRepository = getRepository(UserToken);

  const token = jwt.sign(payload, secret, {
    subject: userId,
    expiresIn,
  });

  const refreshToken = uuid();

  const userToken = userTokenRepository.create({
    id: refreshTokenId,
    token: refreshToken,
    user_id: userId,
  });

  await userTokenRepository.save(userToken);

  return {
    token,
    refreshToken,
  };
}
