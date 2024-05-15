import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { InviteUser } from '../../../shared/interfaces';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { Role } from '../../../shared/enums/role.enum';
import { AuthAccountActions } from '../../../store/actions/auth-account.actions';

@Component({
  standalone: true,
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.css'],
  imports: [
    InputTextModule,
    RouterLink,
    ButtonModule,
    DropdownModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteUserComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  roles = [
    { label: 'Admin', value: Role.Admin },
    { label: 'General', value: Role.General },
    { label: 'Special', value: Role.Special },
  ];

  inviteForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    role: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  onSendInvitation() {
    if (this.inviteForm.valid) {
      this.store.dispatch(
        AuthAccountActions.inviteUser({
          data: this.inviteForm.value as InviteUser,
        })
      );
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
