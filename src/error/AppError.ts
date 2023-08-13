type AppErrorConstructor = {
  code: string;
  message: string;
  statusCode?: number;
}

class AppError {
  public readonly code: string;
  public readonly message: string;
  public readonly statusCode: number;

  constructor({ code, message, statusCode = 400 }: AppErrorConstructor) {
    this.code = code
    this.message = message
    this.statusCode = statusCode
  }
}

export default AppError
