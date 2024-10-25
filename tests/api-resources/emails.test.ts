// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Nuntly from 'nuntly';
import { Response } from 'node-fetch';

const client = new Nuntly({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource emails', () => {
  test('retrieve', async () => {
    const responsePromise = client.emails.retrieve('eml_qiPSkLrTmXvDohbxCcYt3pFEMGgnjHD6kbDL8d4uGKvNGboT');
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
      client.emails.retrieve('eml_qiPSkLrTmXvDohbxCcYt3pFEMGgnjHD6kbDL8d4uGKvNGboT', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Nuntly.NotFoundError);
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

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.emails.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Nuntly.NotFoundError,
    );
  });

  test('bulk: only required params', async () => {
    const responsePromise = client.emails.bulk({
      emails: [
        { from: 'tomlinson@bbn-tenexa.com', to: 'hello@world.net' },
        { from: 'hello@chatgpt.com', to: 'you@world.net' },
      ],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('bulk: required and optional params', async () => {
    const response = await client.emails.bulk({
      emails: [
        {
          from: 'tomlinson@bbn-tenexa.com',
          to: 'hello@world.net',
          bcc: ['string', 'string', 'string'],
          cc: ['string', 'string', 'string'],
          context: {},
          desired_delivery: { delivery_time: 'delivery_time', delivery_timezone: 'delivery_timezone' },
          headers: { foo: 'string' },
          html: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<p>',
          reply_to: ['string', 'string', 'string'],
          subject: 'First email',
          tags: [
            { name: 'name', value: 'value' },
            { name: 'name', value: 'value' },
            { name: 'name', value: 'value' },
          ],
          text: 'text',
        },
        {
          from: 'hello@chatgpt.com',
          to: 'you@world.net',
          bcc: ['string', 'string', 'string'],
          cc: ['string', 'string', 'string'],
          context: {},
          desired_delivery: { delivery_time: 'delivery_time', delivery_timezone: 'delivery_timezone' },
          headers: { foo: 'string' },
          html: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<p>',
          reply_to: ['string', 'string', 'string'],
          subject: 'Welcome to ChatGPT',
          tags: [
            { name: 'name', value: 'value' },
            { name: 'name', value: 'value' },
            { name: 'name', value: 'value' },
          ],
          text: 'text',
        },
      ],
      fallback: {
        bcc: ['string', 'string', 'string'],
        cc: ['string', 'string', 'string'],
        context: {},
        desired_delivery: { delivery_time: 'delivery_time', delivery_timezone: 'delivery_timezone' },
        from: 'from',
        headers: { foo: 'string' },
        html: 'html',
        reply_to: ['string', 'string', 'string'],
        subject: 'subject',
        tags: [
          { name: 'name', value: 'value' },
          { name: 'name', value: 'value' },
          { name: 'name', value: 'value' },
        ],
        text: 'text',
      },
    });
  });

  test('cancel', async () => {
    const responsePromise = client.emails.cancel('eml_qiPSkLrTmXvDohbxCcYt3pFEMGgnjHD6kbDL8d4uGKvNGboT');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('cancel: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.emails.cancel('eml_qiPSkLrTmXvDohbxCcYt3pFEMGgnjHD6kbDL8d4uGKvNGboT', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Nuntly.NotFoundError);
  });

  test('send: only required params', async () => {
    const responsePromise = client.emails.send({ from: 'tomlinson@bbn-tenexa.com', to: 'hello@world.net' });
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
      from: 'tomlinson@bbn-tenexa.com',
      to: 'hello@world.net',
      attachments: [
        { content: 'content', content_type: 'content_type', filename: 'filename', path: 'path' },
        { content: 'content', content_type: 'content_type', filename: 'filename', path: 'path' },
        { content: 'content', content_type: 'content_type', filename: 'filename', path: 'path' },
      ],
      bcc: ['string', 'string', 'string'],
      cc: ['string', 'string', 'string'],
      context: {},
      desired_delivery: { delivery_time: 'delivery_time', delivery_timezone: 'delivery_timezone' },
      headers: { foo: 'string' },
      html: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<p>',
      reply_to: ['string', 'string', 'string'],
      subject: 'First email',
      tags: [
        { name: 'name', value: 'value' },
        { name: 'name', value: 'value' },
        { name: 'name', value: 'value' },
      ],
      text: 'text',
    });
  });
});
