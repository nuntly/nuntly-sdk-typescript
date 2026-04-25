// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Nuntly from '@nuntly/sdk';

const client = new Nuntly({ apiKey: 'My API Key', baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010' });

describe('resource attachments', () => {
  test('retrieve: only required params', async () => {
    const responsePromise = client.messages.attachments.retrieve('iatt_01kabn43yqyxn2bx4ve84mczd3', { messageId: 'imsg_01kabn43yqyxn2bx4ve84mczd3' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.messages.attachments.retrieve('iatt_01kabn43yqyxn2bx4ve84mczd3', { messageId: 'imsg_01kabn43yqyxn2bx4ve84mczd3' });
  });

  test('list', async () => {
    const responsePromise = client.messages.attachments.list('imsg_01kabn43yqyxn2bx4ve84mczd3');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
