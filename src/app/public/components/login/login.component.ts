import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Login } from '../../../shared/interfaces';
import { authConnectFeature } from '../../../store/features';
import { AuthConnectActions } from '../../../store/actions/auth-connect.actions';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    InputTextModule,
    CheckboxModule,
    RouterLink,
    ButtonModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly store = inject(Store);
  loading = this.store.selectSignal(authConnectFeature.selectLoginLoading);
  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  onLogin() {
    if (this.loginForm.valid) {
      this.store.dispatch(
        AuthConnectActions.login({ data: this.loginForm.value as Login })
      );
    }
  }
}
