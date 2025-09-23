// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Nuntly from '@nuntly/sdk';

const client = new Nuntly({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource events', () => {
  test('list', async () => {
    const responsePromise = client.webhooks.events.list();
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
      client.webhooks.events.list({ cursor: 'cursor', limit: 1 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Nuntly.NotFoundError);
  });

  test('deliveries: only required params', async () => {
    const responsePromise = client.webhooks.events.deliveries('event_id', { id: 'id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('deliveries: required and optional params', async () => {
    const response = await client.webhooks.events.deliveries('event_id', { id: 'id' });
  });

  test('replay: only required params', async () => {
    const responsePromise = client.webhooks.events.replay('event_id', { id: 'wh_YNtYn86oYZmP1ZHbnUBvXXFt' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('replay: required and optional params', async () => {
    const response = await client.webhooks.events.replay('event_id', { id: 'wh_YNtYn86oYZmP1ZHbnUBvXXFt' });
  });
});
