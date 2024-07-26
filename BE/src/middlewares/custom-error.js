class customError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

class NotFoundError extends Error {
  constructor(message = 'Not found') {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404; // Not Found
  }
}

class BadRequestError extends Error {
  constructor(message = 'Bad request') {
    super(message);
    this.name = 'BadRequestError';
    this.status = 400; // Bad Request
  }
}

class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
    this.status = 401; // Unauthorized
  }
}

class ForbiddenError extends Error {
  constructor(message = 'Forbidden') {
    super(message);
    this.name = 'ForbiddenError';
    this.status = 403; // Forbidden
  }
}

class InternalServerError extends Error {
  constructor(message = 'Internal server error') {
    super(message);
    this.name = 'InternalServerError';
    this.status = 500; // Internal Server Error
  }
}

class ValidationError extends Error {
  constructor(message = 'Validation failed') {
    super(message);
    this.name = 'ValidationError';
    this.status = 422; // Unprocessable Entity
  }
}

class DatabaseError extends Error {
  constructor(message = 'Database error') {
    super(message);
    this.name = 'DatabaseError';
    this.status = 500; // Internal Server Error
  }
}

class NotModifiedError extends Error {
  constructor(message = 'NotModified error') {
    super(message);
    this.name = 'NotModifiedError';
    this.status = 304; // Not Modified
  }
}

module.exports = {
  NotModifiedError,
  DatabaseError,
  ValidationError,
  InternalServerError,
  ForbiddenError,
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
  customError,
};
