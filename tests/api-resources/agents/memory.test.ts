// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Nuntly from '@nuntly/sdk';

const client = new Nuntly({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource memory', () => {
  test('retrieve', async () => {
    const responsePromise = client.agents.memory.retrieve('x');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.agents.memory.retrieve(
        'x',
        { inboxId: 'inboxId', threadId: 'threadId' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Nuntly.NotFoundError);
  });

  test('upsert: only required params', async () => {
    const responsePromise = client.agents.memory.upsert('x', { memory: { foo: 'string' } });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('upsert: required and optional params', async () => {
    const response = await client.agents.memory.upsert('x', {
      memory: { foo: 'string' },
      inboxId: 'inboxId',
      summary: 'summary',
      threadId: 'threadId',
    });
  });
});
