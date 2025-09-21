
export interface ErrorResponse {
  message: string;
  status: number;
  code?: string;
  timeStamp?: string;
  details?: Record<string, unknown>;
}
