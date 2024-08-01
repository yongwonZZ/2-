// Custom Error Classes
export class CustomError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

export class NotFoundError extends CustomError {
  constructor(message = 'Not found') {
    super(404, message);
    this.name = 'NotFoundError';
  }
}

export class BadRequestError extends CustomError {
  constructor(message = 'Bad request') {
    super(400, message);
    this.name = 'BadRequestError';
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message = 'Unauthorized') {
    super(401, message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends CustomError {
  constructor(message = 'Forbidden') {
    super(403, message);
    this.name = 'ForbiddenError';
  }
}

export class InternalServerError extends CustomError {
  constructor(message = 'Internal server error') {
    super(500, message);
    this.name = 'InternalServerError';
  }
}

export class ValidationError extends CustomError {
  constructor(message = 'Validation failed') {
    super(422, message);
    this.name = 'ValidationError';
  }
}

export class DatabaseError extends CustomError {
  constructor(message = 'Database error') {
    super(500, message);
    this.name = 'DatabaseError';
  }
}

export class NotModifiedError extends CustomError {
  constructor(message = 'NotModified error') {
    super(304, message);
    this.name = 'NotModifiedError';
  }
}

// Error Handler Middleware
export function errorHandler(error, req, res, next) {
  // 터미널에 노란색으로 출력됨.
  console.log('\x1b[33m%s\x1b[0m', error.stack);

  // 에러가 CustomError의 인스턴스인 경우 해당 상태 코드를 사용하고, 그렇지 않으면 500 코드를 사용합니다.
  const status = error instanceof CustomError ? error.code : 500;

  res.status(status).json({ result: 'error', reason: error.message });
}
