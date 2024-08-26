function errorHandler(error, request, response, next) {
  console.log(error);
  response.sendStatus(500);
}

export default errorHandler;