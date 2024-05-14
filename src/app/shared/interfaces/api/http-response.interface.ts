export interface HttpResponse<T> {
  code: string | null;
  data: T;
  message: string;
}
