// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Nuntly from 'nuntly';
import { Response } from 'node-fetch';

const client = new Nuntly({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource webhooks', () => {
  test('create: only required params', async () => {
    const responsePromise = client.webhooks.create({
      endpoint_url: 'https://webhook.site/12345678-1234-5678-1234-123456789012',
      events: ['Bounce', 'Complaint'],
      status: 'enabled',
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
      endpoint_url: 'https://webhook.site/12345678-1234-5678-1234-123456789012',
      events: ['Bounce', 'Complaint'],
      status: 'enabled',
      name: 'My fist webhook',
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.webhooks.retrieve('wh_YNtYn86oYZmP1ZHbnUBvXXFt');
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
      client.webhooks.retrieve('wh_YNtYn86oYZmP1ZHbnUBvXXFt', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Nuntly.NotFoundError);
  });

  test('update: only required params', async () => {
    const responsePromise = client.webhooks.update('wh_YNtYn86oYZmP1ZHbnUBvXXFt', {
      events: ['Bounce', 'Complaint', 'Delivery'],
      status: 'enabled',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.webhooks.update('wh_YNtYn86oYZmP1ZHbnUBvXXFt', {
      events: ['Bounce', 'Complaint', 'Delivery'],
      status: 'enabled',
      endpoint_url: 'https://webhook.site/12345678-abcd-5678-abcd-123456789012',
      name: 'My fist webhook',
    });
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

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.webhooks.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Nuntly.NotFoundError,
    );
  });

  test('delete', async () => {
    const responsePromise = client.webhooks.delete('wh_YNtYn86oYZmP1ZHbnUBvXXFt');
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
      client.webhooks.delete('wh_YNtYn86oYZmP1ZHbnUBvXXFt', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Nuntly.NotFoundError);
  });
});
