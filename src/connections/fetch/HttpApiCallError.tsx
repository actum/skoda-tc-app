export default class HttpApiCallError extends Error {
  stack: string | undefined;
  textResponse: string | undefined;
  jsonResponse: unknown;

  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.stack = new Error(message).stack;
    this.name = 'HttpApiCallError';
  }
}

export interface IHttpApiCallError {
  message: string;
  response: unknown;
  statusCode: number;
}
