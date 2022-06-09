export type HttpRequest = {
  url: string;
  params?: unknown;
  headers?: Record<string, any>;
  body?: unknown;
};

export type HttpResponse<Data = any> = {
  status: number;
  data: Data;
  headers: Record<string, unknown>;
};
