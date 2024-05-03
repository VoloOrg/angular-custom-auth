import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
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
import { AuthActions } from '../../../store/actions/auth.actions';
import { ForgotPassword } from '../../../shared/interfaces';
import { authFeature } from '../../../store/features';

@Component({
  standalone: true,
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  imports: [InputTextModule, RouterLink, ButtonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  loading = this.store.selectSignal(authFeature.selectForgotPasswordLoading);

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
  });
  constructor() {}

  ngOnInit() {}

  onCancel() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.store.dispatch(
        AuthActions.forgotPassword({
          data: this.forgotPasswordForm.value as ForgotPassword,
        })
      );
    }
  }
}
