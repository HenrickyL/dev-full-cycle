export class HttpError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
  ) {
    super(message);
  }
}

export class NotFoundException extends HttpError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class BadRequestException extends HttpError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotAllowedException extends HttpError {
  constructor(message: string) {
    super(message, 401);
  }
}
