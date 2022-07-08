import { APIResponse } from './APIResponse.js';

export class APIError extends Error {
  constructor(message: string, readonly apiResponse: APIResponse) {
    super(message);
  }
}
