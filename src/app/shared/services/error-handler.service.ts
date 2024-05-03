import { ErrorHandler, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { ToastService } from './toast.service';
import { AuthActions } from '../../store/actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService extends ErrorHandler {
  private readonly toastService = inject(ToastService);
  private readonly store = inject(Store);
  public readonly router = inject(Router);

  handle(error: Error, showMessage = true, canRedirect = true) {
    if (!showMessage) {
      return;
    }
    const messageTitle = 'Error';
    if (error instanceof HttpErrorResponse) {
      if (error.error?.message) {
        this.toastService.error(error.error.message, messageTitle);
      }
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.store.dispatch(AuthActions.logout());
          break;
        case HttpStatusCode.NotFound:
          if (canRedirect) {
            this.router.navigate(['/non-found']);
          }
          break;
        case HttpStatusCode.Forbidden:
          if (canRedirect) {
            this.router.navigate(['/access-denied']);
          }
          break;
      }
    }
  }
}
