// Standard response interfaces
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  timestamp: string;
  path?: string;
  details?: Record<string, unknown>;
}

// Query parameters for list operations
export interface ListQueryParams {
  page?: number;
  size?: number;
  sort?: string;
  direction?: 'ASC' | 'DESC';
  search?: string;
}

// Standard request options
export interface RequestOptions {
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
}
