import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
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
import { AuthActions } from '../../../store/actions/auth.actions';
import { Login } from '../../../shared/interfaces';
import { authFeature } from '../../../store/features';

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
export class LoginComponent implements OnInit {
  private readonly store = inject(Store);
  loading = this.store.selectSignal(authFeature.selectLoginLoading);
  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });
  constructor() {}

  ngOnInit() {}

  onLogin() {
    if (this.loginForm.valid) {
      this.store.dispatch(
        AuthActions.login({ data: this.loginForm.value as Login })
      );
    }
  }
}
