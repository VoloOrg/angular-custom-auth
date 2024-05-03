import { HttpErrorResponse } from '@angular/common/http';

export const httpErrorProps = () => {
  return (res: {
    error: HttpErrorResponse;
    success?: boolean;
    showMessage?: boolean;
    customMessage?: string;
    canRedirect?: boolean;
  }) => ({
    error: res.error,
    success: res.success ?? false,
    showMessage: res.showMessage ?? true,
    customMessage: res.customMessage ?? '',
    canRedirect: res.canRedirect ?? true,
  });
};
