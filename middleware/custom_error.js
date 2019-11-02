class DomainError extends Error {
    constructor(message) {
      super(message);
     // Ensure the name of this error is the same as the class name
      this.name = this.constructor.name;
      this.statusCode = this.constructor.statusCode;
     // This clips the constructor invocation from the stack trace.
     // It's not absolutely essential, but it does make the stack trace a little nicer.
     //  @see Node.js reference (bottom)
      Error.captureStackTrace(this, this.constructor);
    }
}
  
class ResourceNotFoundError extends DomainError {
    constructor(resource, query) {
      super(`Resource ${resource} was not found.`);
      this.data = { resource, query };
    }
}

class customAuthorizeError extends DomainError {
    constructor(resource) {
      super(resource);
      this.statusCode = 401;
      this.data = {resource};
    }
}

class customStatusError extends DomainError {
    constructor(resource, statusCode) {
      super(resource);
      this.statusCode = statusCode;
      this.data = {resource};
    }
}

  // I do something like this to wrap errors from other frameworks.
  // Correction thanks to @vamsee on Twitter:
  // https://twitter.com/lakamsani/status/1035042907890376707
class InternalError extends DomainError {
    constructor(error) {
      super(error.message);
      this.data = { error };
    }
}

sendError = (res, status, message) => error => {
  res.status(status || error.status).json({
    type: 'error', 
    message: message || error.message, 
    error
  })
}

  
module.exports = {
    customStatusError,
    customAuthorizeError,
    ResourceNotFoundError,
    InternalError,  
    sendError
};
  