// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Nuntly from '@nuntly/sdk';

const client = new Nuntly({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource bulk', () => {
  test('retrieve', async () => {
    const responsePromise = client.emails.bulk.retrieve(
      'blk_qiPSkLrTmXvDohbxCcYt3pFEMGgnjHD6kbDL8d4uGKvNGboT',
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('send: only required params', async () => {
    const responsePromise = client.emails.bulk.send({
      emails: [{ to: 'carlo43@gmail.com' }, { to: 'pink42@yahoo.com' }],
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
    const response = await client.emails.bulk.send({
      emails: [
        {
          to: 'carlo43@gmail.com',
          bcc: ['string'],
          cc: ['string'],
          context: {},
          from: 'ray@info.tomlinson.ai',
          headers: { foo: 'string' },
          html: '<html><body><p>Hi, Thank you for signing up! Please verify your email ...</p></body></html>',
          reply_to: ['string'],
          scheduled_at: '2019-12-27T18:11:19.117Z',
          subject: 'Welcome to Tomlinson AI!',
          tags: [{ name: 'name', value: 'value' }],
          text: 'text',
        },
        {
          to: 'pink42@yahoo.com',
          bcc: ['string'],
          cc: ['string'],
          context: {},
          from: 'ray@info.tomlinson.ai',
          headers: { foo: 'string' },
          html: '<html><body><p>Hi, Thank you for signing up! Please verify your email ...</p></body></html>',
          reply_to: ['string'],
          scheduled_at: '2019-12-27T18:11:19.117Z',
          subject: 'Welcome to Tomlinson AI!',
          tags: [{ name: 'name', value: 'value' }],
          text: 'text',
        },
      ],
      fallback: {
        bcc: ['string'],
        cc: ['string'],
        context: {},
        from: 'from',
        headers: { foo: 'string' },
        html: 'html',
        reply_to: ['string'],
        scheduled_at: '2019-12-27T18:11:19.117Z',
        subject: 'subject',
        tags: [{ name: 'name', value: 'value' }],
        text: 'text',
        to: ['string'],
      },
    });
  });
});
