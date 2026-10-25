export interface NamespaceInboxesQuery {
  /** The cursor to retrieve the next page of results */
  cursor?: string;
  /** The maximum number of results to return, from 1 to 30. Defaults to 30. */
  limit?: number;
}
