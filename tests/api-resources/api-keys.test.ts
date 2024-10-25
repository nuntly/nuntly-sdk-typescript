// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Nuntly from 'nuntly';
import { Response } from 'node-fetch';

const client = new Nuntly({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource apiKeys', () => {
  test('create', async () => {
    const responsePromise = client.apiKeys.create();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.apiKeys.create({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Nuntly.NotFoundError,
    );
  });

  test('create: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.apiKeys.create({ name: 'My first API key' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Nuntly.NotFoundError);
  });

  test('retrieve', async () => {
    const responsePromise = client.apiKeys.retrieve('ak_pdGukGd4BTmHj8dscBDE5Mc9');
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
      client.apiKeys.retrieve('ak_pdGukGd4BTmHj8dscBDE5Mc9', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Nuntly.NotFoundError);
  });

  test('update', async () => {
    const responsePromise = client.apiKeys.update('ak_pdGukGd4BTmHj8dscBDE5Mc9', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.apiKeys.list();
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
    await expect(client.apiKeys.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Nuntly.NotFoundError,
    );
  });

  test('delete', async () => {
    const responsePromise = client.apiKeys.delete('ak_pdGukGd4BTmHj8dscBDE5Mc9');
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
      client.apiKeys.delete('ak_pdGukGd4BTmHj8dscBDE5Mc9', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Nuntly.NotFoundError);
  });
});
