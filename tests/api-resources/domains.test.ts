// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Nuntly from 'nuntly';
import { Response } from 'node-fetch';

const client = new Nuntly({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource domains', () => {
  test('create: only required params', async () => {
    const responsePromise = client.domains.create({ name: 'acme.com' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.domains.create({ name: 'acme.com', region: 'eu-west-1' });
  });

  test('retrieve', async () => {
    const responsePromise = client.domains.retrieve('dn_FdfQe2eZAzRrHCXKSr7VsxUz');
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
      client.domains.retrieve('dn_FdfQe2eZAzRrHCXKSr7VsxUz', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Nuntly.NotFoundError);
  });

  test('update', async () => {
    const responsePromise = client.domains.update('dn_FdfQe2eZAzRrHCXKSr7VsxUz', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.domains.list();
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
    await expect(client.domains.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Nuntly.NotFoundError,
    );
  });

  test('delete', async () => {
    const responsePromise = client.domains.delete('dn_FdfQe2eZAzRrHCXKSr7VsxUz');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.domains.delete('dn_FdfQe2eZAzRrHCXKSr7VsxUz', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Nuntly.NotFoundError);
  });
});
