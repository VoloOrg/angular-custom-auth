import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthActions } from '../../../store/actions/auth.actions';
import { ChangePassword } from '../../../shared/interfaces';

@Component({
  standalone: true,
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  imports: [ButtonModule, InputTextModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  changePasswordForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    oldPassword: new FormControl('', {
      validators: [Validators.required],
    }),
    newPassword: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  onCancel() {
    this.router.navigate(['/']);
  }

  onUpdatePassword() {
    if (this.changePasswordForm.valid) {
      this.store.dispatch(
        AuthActions.changePassword({
          data: this.changePasswordForm.value as ChangePassword,
        })
      );
    }
  }
}
