import type { NuntlyClient } from './client.js';

export abstract class Resource {
  protected _http: NuntlyClient;

  constructor(client: NuntlyClient) {
    this._http = client;
  }
}
