import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AuthActions } from '../store/actions/auth.actions';

@Component({
  standalone: true,
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
  imports: [RouterOutlet, MenubarModule],
})
export class PrivateComponent {
  private readonly store = inject(Store);

  items: MenuItem[] = [
    {
      label: 'Settings',
      icon: 'pi pi-fw pi-cog',
      items: [
        {
          label: 'Change Password',
          icon: 'pi pi-fw pi-unlock',
          routerLink: '/change-password',
        },
        {
          icon: 'pi pi-fw pi-user',
          label: 'User',
        },
      ],
    },
    {
      label: 'Quit',
      icon: 'pi pi-fw pi-power-off',
      command: () => this.store.dispatch(AuthActions.logout()),
    },
  ];
}
