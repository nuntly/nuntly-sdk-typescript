// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Nuntly from '@nuntly/sdk';

const client = new Nuntly({ apiKey: 'My API Key', baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010' });

describe('resource emails', () => {
  test('retrieve', async () => {
    const responsePromise = client.emails.retrieve('em_01ka8k8s80gvx9604cn9am5st4');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.emails.list();
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
    await expect(client.emails.list({ cursor: 'cursor', limit: 1 }, { path: '/_stainless_unknown_path' }))
      .rejects
      .toThrow(Nuntly.NotFoundError);
  });

  test('cancel', async () => {
    const responsePromise = client.emails.cancel('em_01ka8k8s80gvx9604cn9am5st4');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('send: only required params', async () => {
    const responsePromise = client.emails.send({
    from: 'Tomlinson AI <ray@info.tomlinson.ai>',
    subject: 'Verify your email address',
    to: 'brian67@gmail.com',
  });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('send: required and optional params', async () => {
    const response = await client.emails.send({
    from: 'Tomlinson AI <ray@info.tomlinson.ai>',
    subject: 'Verify your email address',
    to: 'brian67@gmail.com',
    attachments: [{
    content: 'SGVsbG8gV29ybGQ=',
    contentType: 'application/pdf',
    filename: 'invoice.pdf',
  }],
    bcc: ['string'],
    cc: ['string'],
    headers: { foo: 'string' },
    html: '<h1>Welcome 🎉</h1><p>Thank you for signing up! Please verify your email address.</p>',
    replyTo: ['string'],
    scheduledAt: 'scheduledAt',
    tags: [{ name: 'category', value: 'transactional' }],
    text: 'Thank you for signing up! Please verify your email address.',
    variables: { foo: 'string' },
  });
  });
});
