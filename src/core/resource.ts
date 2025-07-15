// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Nuntly } from '../client';

export abstract class APIResource {
  protected _client: Nuntly;

  constructor(client: Nuntly) {
    this._client = client;
  }
}
