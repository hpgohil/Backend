const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };
};

export { asyncHandler };

//asyncHandler is a HOF i.e., it takes 'fn' as argument and also returns function. ie. return (req, res, next) => {}
//here we are passing 'fn' function into another function i.e., returned function
//(req, res, next) extracted from the function which we passed
// const asyncHandler = (fn) => {
//   async (req, res, next) => {
//     try {
//       await fn(req, res, next);
//     } catch (error) {
//       res.status(error.code || 500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };
// };
