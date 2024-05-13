export interface HttpResponse<T> {
  code: string | null;
  Data: T;
  message: string;
}
