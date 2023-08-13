import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import AppError from '../error/AppError'

import User from "../models/User";

interface Request {
  fullname: string;
  email: string;
  password: string;
  role: "admin" | "manager" | "technical" | "parents";
}

class CreateUserService {
  public async execute({ fullname, email, password, role }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError({
        code: "duplicated",
        message: "Email address already used",
        statusCode: 409
      });
    }

    const hasedPassword = await hash(password, 8);

    const user = usersRepository.create({
      fullname,
      email,
      password: hasedPassword,
      role
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
