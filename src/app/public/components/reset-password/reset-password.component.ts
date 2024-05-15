import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { AuthConnectActions } from '../../../store/actions/auth-connect.actions';
import { Store } from '@ngrx/store';
import { authConnectFeature } from '../../../store/features';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ResetPassword } from '../../../shared/interfaces';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  imports: [InputTextModule, RouterLink, ButtonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  loading = this.store.selectSignal(authConnectFeature.selectLoginLoading);
  readonly token = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get('token')))
  )();
  readonly email = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get('email')))
  )();

  resetForm = new FormGroup({
    email: new FormControl(this.email, {
      validators: [Validators.required],
    }),
    token: new FormControl(this.token, {
      validators: [Validators.required],
    }),
    newPassword: new FormControl('', {
      validators: [Validators.required],
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  onReset() {
    if (this.resetForm.valid) {
      this.store.dispatch(
        AuthConnectActions.resetPassword({
          data: this.resetForm.value as ResetPassword,
        })
      );
    }
  }

  onCancel() {
    this.router.navigate(['/login']);
  }
}
