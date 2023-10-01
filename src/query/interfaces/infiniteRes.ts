export interface InfiniteRes<Data> {
  data: Data[];
  meta: {
    hasNextPage: boolean;
    newCursor?: string;
  };
}
