import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/soccer/overview/overview.component')
        .then(m => m.OverviewComponent)
  }
];
