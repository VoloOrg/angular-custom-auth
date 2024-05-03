import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthActions } from '../../../store/actions/auth.actions';
import { Login } from '../../../shared/interfaces';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [InputTextModule, RouterLink, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private readonly store = inject(Store);

  registerForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  onLogin() {
    if (this.registerForm.valid) {
      this.store.dispatch(
        AuthActions.register({ data: this.registerForm.value as Login })
      );
    }
  }
}
