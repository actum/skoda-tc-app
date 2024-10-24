import HttpApiCallError from './HttpApiCallError';
import { API_URL, USER_TOKEN } from '@env';

export async function asyncFetch<T>(
  path: string,
  requestConfig: RequestInit = {},
): Promise<T> {
  const url = `${API_URL}${path}`;

  let response: Response;
  try {
    response = await fetch(url, getBaseRequestConfig(requestConfig));
    console.log('response', response);
  } catch (e) {
    const error = e as Error;
    const httpError = new HttpApiCallError(`Failed to Fetch: ${url}`, 500);
    httpError.textResponse = error.message;
    throw httpError;
  }
  const isSuccess = response.status >= 200 && response.status < 300;
  console.log('response.status', response.status);
  const contentType = response.headers.get('content-type');

  if (isSuccess) {
    if (contentType?.includes('application/json')) {
      try {
        return await response.json();
      } catch (e) {
        return {} as T;
      }
    }
    throw new HttpApiCallError('Server Error', response.status);
  }

  let jsonResponse;
  let textResponse;

  const isJsonResponse = contentType?.includes('application/json');

  if (isJsonResponse) {
    jsonResponse = await response.json();
    console.log('JSON RESPONSE', jsonResponse);
  } else {
    textResponse = 'Server Error';
    // textResponse = await response.text()
  }

  let errorMessage = response.statusText;
  if (!errorMessage) {
    if (isJsonResponse && jsonResponse.error) {
      errorMessage = jsonResponse.error;
    }
    if (!isJsonResponse && textResponse) {
      errorMessage = textResponse;
    }
  }

  const error = new HttpApiCallError(errorMessage, response.status);
  error.jsonResponse = jsonResponse;
  error.textResponse = textResponse;

  throw error;
}

function getBaseRequestConfig(overrideConfig: RequestInit): RequestInit {
  const config: RequestInit = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${USER_TOKEN}`,
    },
    ...overrideConfig,
  };

  console.log('REQ.CONFIG', config);

  return config;
}
