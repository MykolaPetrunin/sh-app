export interface ItemsBody {
  limit?: number;
  cursor?: string;
  search?: string;
  sortField?: 'created_at' | 'title';
  sortOrder?: 'ASC' | 'DESC';
}
