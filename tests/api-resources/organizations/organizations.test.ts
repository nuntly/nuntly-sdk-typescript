// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Nuntly from 'nuntly';
import { Response } from 'node-fetch';

const client = new Nuntly({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource organizations', () => {
  test('retrieve', async () => {
    const responsePromise = client.organizations.retrieve('org_9UTZz2PisZ68YwE3NJu9urQ9');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.organizations.retrieve('org_9UTZz2PisZ68YwE3NJu9urQ9', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Nuntly.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.organizations.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.organizations.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Nuntly.NotFoundError,
    );
  });
});
