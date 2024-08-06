class ApiError extends Error {
  constructor(
    //whoever will use this constructor, will give me following details
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    //here we will overwrite things in constructor
    super(message); //message in constructor will be overwritten
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false; //success flag will be false when message is sent
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export { ApiError };
