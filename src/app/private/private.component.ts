import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenubarModule } from 'primeng/menubar';
import { AuthAccountActions } from '../store/actions/auth-account.actions';
import { authAccountFeature } from '../store/features';
import { Role } from '../shared/enums/role.enum';

@Component({
  standalone: true,
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
  imports: [RouterOutlet, MenubarModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateComponent {
  private readonly store = inject(Store);
  currentUser = this.store.selectSignal(authAccountFeature.selectCurrentUser);
  role = Role;
  items = computed(() => [
    {
      label: 'Settings',
      icon: 'pi pi-fw pi-cog',
      items: [
        {
          id: '1',
          label: 'Change Password',
          icon: 'pi pi-fw pi-unlock',
          routerLink: '/change-password',
        },
        {
          id: '2',
          icon: 'pi pi-fw pi-user',
          label: 'Invite User',
          routerLink: '/invite-user',
          visible: Number(this.currentUser()?.role) === Role.Admin,
        },
      ],
    },
    {
      label: 'Quit',
      icon: 'pi pi-fw pi-power-off',
      command: () => this.store.dispatch(AuthAccountActions.logout()),
    },
  ]);
}
