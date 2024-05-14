import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Login } from '../../../shared/interfaces';
import { AuthConnectActions } from '../../../store/actions/auth-connect.actions';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Role } from '../../../shared/enums/role.enum';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    InputTextModule,
    RouterLink,
    ButtonModule,
    ReactiveFormsModule,
    DropdownModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);

  readonly token = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get('token')))
  )();
  readonly role = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get('role')))
  )();
  readonly email = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get('email')))
  )();

  registerForm = new FormGroup({
    email: new FormControl(
      {
        value: this.email,
        disabled: true,
      },
      { validators: [Validators.required] }
    ),
    role: new FormControl(
      { value: this.role ? +this.role : '', disabled: true },
      {
        validators: [Validators.required],
      }
    ),
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

  roles = [
    { label: 'Admin', value: Role.Admin },
    { label: 'General', value: Role.General },
    { label: 'Special', value: Role.Special },
  ];

  onRegister() {
    if (this.registerForm.valid) {
      this.store.dispatch(
        AuthConnectActions.register({
          data: this.registerForm.getRawValue() as unknown as Login,
        })
      );
    }
  }
}
