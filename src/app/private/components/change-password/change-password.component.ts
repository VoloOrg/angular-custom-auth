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
import { ChangePassword } from '../../../shared/interfaces';
import { AuthAccountActions } from '../../../store/actions/auth-account.actions';
import { confirmedValidator } from '../../../shared/validators/confirm.validator';

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
  changePasswordForm = new FormGroup(
    {
      currentPassword: new FormControl('', {
        validators: [Validators.required],
      }),
      newPassword: new FormControl('', {
        validators: [Validators.required],
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required],
      }),
    },
    {
      validators: [confirmedValidator('newPassword', 'confirmPassword')],
    }
  );

  onCancel() {
    this.router.navigate(['/']);
  }

  onUpdatePassword() {
    if (this.changePasswordForm.valid) {
      this.store.dispatch(
        AuthAccountActions.changePassword({
          data: this.changePasswordForm.value as ChangePassword,
        })
      );
    }
  }
}
