import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ForgotPassword } from '../../../shared/interfaces';
import { authConnectFeature } from '../../../store/features';
import { AuthConnectActions } from '../../../store/actions/auth-connect.actions';

@Component({
  standalone: true,
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  imports: [InputTextModule, RouterLink, ButtonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent {
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  loading = this.store.selectSignal(
    authConnectFeature.selectForgotPasswordLoading
  );

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
  });

  onCancel() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.store.dispatch(
        AuthConnectActions.forgotPassword({
          data: this.forgotPasswordForm.value as ForgotPassword,
        })
      );
    }
  }
}
