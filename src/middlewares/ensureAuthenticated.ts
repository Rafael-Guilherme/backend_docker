import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";
import AppError from "../error/AppError";

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
  role: string;
}

export default function ensureAuthenticated(roles?: string[]) {
  return (request: Request, _: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError({
        code: "token.invalid",
        message: "JWT token is missing",
        statusCode: 401,
      });
    }

    const [schema, token] = authHeader.split(" ");

    if (schema !== "Bearer") {
      throw new AppError({
        code: "token.invalid",
        message: "Token mal formatted",
        statusCode: 401,
      });
    }

    try {
      const decoded = verify(token, authConfig.jwt.secret);

      const { sub, role } = decoded as TokenPayLoad;

      if (roles && roles.length > 0) {
        if (!roles.includes(role)) {
          throw new AppError({
            code: "token.invalid",
            message: "User don't have permission to do it",
            statusCode: 401,
          });
        }
      }

      request.user = { id: sub, role };

      return next();
    } catch {
      throw new AppError({
        code: "token.expired",
        message: "Token expired",
        statusCode: 401,
      });
    }
  };
}
