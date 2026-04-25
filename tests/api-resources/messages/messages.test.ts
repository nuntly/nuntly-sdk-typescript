// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Nuntly from '@nuntly/sdk';

const client = new Nuntly({ apiKey: 'My API Key', baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010' });

describe('resource messages', () => {
  test('retrieve', async () => {
    const responsePromise = client.messages.retrieve('imsg_01kabn43yqyxn2bx4ve84mczd3');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update', async () => {
    const responsePromise = client.messages.update('imsg_01kabn43yqyxn2bx4ve84mczd3');
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
    await expect(client.messages.update('imsg_01kabn43yqyxn2bx4ve84mczd3', { addLabels: ['x'], removeLabels: ['x'] }, { path: '/_stainless_unknown_path' }))
      .rejects
      .toThrow(Nuntly.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.messages.list();
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
    await expect(client.messages.list({
    cursor: 'cursor',
    domainId: 'domainId',
    from: 'from',
    limit: 1,
  }, { path: '/_stainless_unknown_path' }))
      .rejects
      .toThrow(Nuntly.NotFoundError);
  });

  test('forward: only required params', async () => {
    const responsePromise = client.messages.forward('imsg_01kabn43yqyxn2bx4ve84mczd3', { to: ['dev@stainless.com'] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('forward: required and optional params', async () => {
    const response = await client.messages.forward('imsg_01kabn43yqyxn2bx4ve84mczd3', { to: ['dev@stainless.com'], text: 'text' });
  });

  test('reply', async () => {
    const responsePromise = client.messages.reply('imsg_01kabn43yqyxn2bx4ve84mczd3');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('reply: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.messages.reply('imsg_01kabn43yqyxn2bx4ve84mczd3', {
    html: 'html',
    replyAll: true,
    text: 'text',
  }, { path: '/_stainless_unknown_path' }))
      .rejects
      .toThrow(Nuntly.NotFoundError);
  });
});
