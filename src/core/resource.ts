import type { NuntlyClient } from './client.js';
import type { ResponseWithData } from './types.js';

export abstract class Resource {
  protected _http: NuntlyClient;

  constructor(client: NuntlyClient) {
    this._http = client;
  }

  async withResponse<T>(promise: Promise<T>): Promise<ResponseWithData<T>> {
    const data = await promise;
    return { data, response: this._http.lastResponse! };
  }
}
