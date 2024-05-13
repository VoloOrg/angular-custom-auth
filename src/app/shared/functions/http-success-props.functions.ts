import { HttpResponse } from '../interfaces/api/http-response.interface';

export const httpSuccessProps = <T>() => {
  return (res: HttpResponse<T>) => ({
    data: res.Data,
    success: true,
    message: res.message,
  });
};
