// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Nuntly from '@nuntly/sdk';

const client = new Nuntly({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource webhooks', () => {
  test('create: only required params', async () => {
    const responsePromise = client.webhooks.create({
      endpointUrl: 'https://example.com',
      events: ['email.queued'],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.webhooks.create({
      endpointUrl: 'https://example.com',
      events: ['email.queued'],
      name: 'name',
      status: 'enabled',
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.webhooks.retrieve('wh_01ka8k8s80gvx9604cn9am5st4');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update', async () => {
    const responsePromise = client.webhooks.update('wh_01ka8k8s80gvx9604cn9am5st4');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.webhooks.update(
        'wh_01ka8k8s80gvx9604cn9am5st4',
        {
          endpointUrl: 'https://example.com',
          events: ['email.queued'],
          name: 'name',
          rotateSecret: true,
          status: 'enabled',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Nuntly.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.webhooks.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.webhooks.list({ cursor: 'cursor', limit: 1 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Nuntly.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.webhooks.delete('wh_01ka8k8s80gvx9604cn9am5st4');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
