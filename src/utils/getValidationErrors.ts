/* eslint-disable consistent-return */
import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getvalidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    if (!error.path) {
      return {};
    }
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
