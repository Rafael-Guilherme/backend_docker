import { getRepository } from "typeorm";
import { compare } from "bcryptjs";

import AppError from '../error/AppError'
import User from "../models/User";
import { generateJwtAndRefreshToken } from "../components/generateJWTAndRefreshToken";

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
  refreshToken: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError({
        code: "credentials.invalid",
        message: "Email ou Senha incorreto",
        statusCode: 400
      });
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError({
        code: "credentials.invalid",
        message: "Email ou Senha incorreto",
        statusCode: 400
      });
    }

    const { refreshToken, token } = await generateJwtAndRefreshToken(user.id, {
      role: user.role
    });

    return {
      user,
      token,
      refreshToken,
    };
  }
}

export default AuthenticateUserService;
