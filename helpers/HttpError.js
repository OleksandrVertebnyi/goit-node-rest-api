const HttpError = (status, message = 'Error') => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export default HttpError;


