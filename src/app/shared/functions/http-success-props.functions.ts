import { HttpResponse } from '../interfaces/api/http-response.interface';

export const httpSuccessProps = <T>() => {
  return (res: HttpResponse<T>) => ({
    data: res.data,
    success: true,
    message: res.message,
  });
};
