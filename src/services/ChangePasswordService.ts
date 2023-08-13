import { getRepository } from "typeorm";
import { compare, hash } from "bcryptjs";

import AppError from "../error/AppError";
import User from "../models/User";

interface Request {
  oldPassword: string;
  newPassword: string;
  user_id: string;
}

class ChangePassowrdService {
  public async execute({
    oldPassword,
    newPassword,
    user_id,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const userExists = await usersRepository.findOne({
      where: { id: user_id },
    });

    if (!userExists) {
      throw new AppError({
        code: "credentials.invalid",
        message: "Email ou Senha incorreto",
        statusCode: 401,
      });
    }

    const passwordMatched = await compare(oldPassword, userExists.password);
    if (!passwordMatched) {
      throw new AppError({
        code: "credentials.invalid",
        message: "Email ou Senha incorreto",
        statusCode: 401,
      });
    }

    const hasedPassword = await hash(newPassword, 8);

    const user = usersRepository.create({
      id: user_id,
      password: hasedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default ChangePassowrdService;
