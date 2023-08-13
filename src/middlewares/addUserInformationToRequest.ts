import { Request, Response, NextFunction } from "express";
import decode from "jwt-decode";
import AppError from "../error/AppError";

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
  role: string;
}

export function addUserInformationToRequest(request: Request, _: Response, next: NextFunction) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError({
      code: "token.invalid",
      message: "Token not present.",
      statusCode: 401
    })
  }

  const [schema, token] = authorization?.split(" ");

  if (schema !== "Bearer") {
    throw new AppError({
      code: "token.invalid",
      message: "Token mal formatted",
      statusCode: 401,
    });
  }

  if (!token) {
    throw new AppError({
      code: "token.invalid",
      message: "Token not present.",
      statusCode: 401,
    });
  }

  try {
    const decoded = decode(token as string) as TokenPayLoad;

    request.user = {
      id: decoded.sub,
      role: decoded.role,
    };

    return next();
  } catch (err) {
    throw new AppError({
      code: "token.invalid",
      message: "Invalid token format.",
      statusCode: 401,
    });
  }
}
