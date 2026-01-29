// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Nuntly from '@nuntly/sdk';

const client = new Nuntly({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource bulk', () => {
  test('retrieve', async () => {
    const responsePromise = client.emails.bulk.retrieve('blk_01ka8k8s80gvx9604cn9am5st4');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('send: only required params', async () => {
    const responsePromise = client.emails.bulk.send({ emails: [{}] });
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
          bcc: ['string'],
          cc: ['string'],
          context: { foo: 'string' },
          from: 'from',
          headers: { foo: 'string' },
          html: 'html',
          replyTo: ['string'],
          scheduledAt: 'scheduledAt',
          subject: 'subject',
          tags: [{ name: 'name', value: 'value' }],
          text: 'text',
          to: ['string'],
        },
      ],
      fallback: {
        bcc: ['string'],
        cc: ['string'],
        context: { foo: 'string' },
        from: 'from',
        headers: { foo: 'string' },
        html: 'html',
        replyTo: ['string'],
        scheduledAt: 'scheduledAt',
        subject: 'subject',
        tags: [{ name: 'name', value: 'value' }],
        text: 'text',
        to: ['string'],
      },
    });
  });
});
