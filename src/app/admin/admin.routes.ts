import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [

      // ── Redirect raíz ──────────────────────────────────────────────
      {
        path: '',
        redirectTo: 'soccer/overview',
        pathMatch: 'full',
      },

      // ── Soccer ─────────────────────────────────────────────────────
      {
        path: 'soccer',
        children: [
          {
            path: '',
            redirectTo: 'overview',
            pathMatch: 'full',
          },
          {
            path: 'overview',
            loadComponent: () =>
              import('./features/soccer/overview-soccer/overview-soccer.component')
                .then(m => m.OverviewSoccerComponent),
          },
          {
            path: 'teams',
            loadComponent: () =>
              import('../admin/features/soccer/teams/soccer-team-form/soccer-team-form.component')
                .then(m => m.SoccerTeamFormComponent),
          },
          {
            path: 'matches',
            loadComponent: () =>
              import('./features/soccer/matches/soccer-match-form/soccer-match-form.component')
                .then(m => m.SoccerMatchFormComponent),
          },
          {
            path: 'tournaments',
            loadComponent: () =>
              import('./features/soccer/tournaments/soccer-tournaments-form.component')
                .then(m => m.soccerTournamentsFormComponent),
          }
        ],
      },

      // ── Volleyball ─────────────────────────────────────────────────
      {
        path: 'volleyball',
        children: [
          {
            path: '',
            redirectTo: 'overview',
            pathMatch: 'full',
          },
          {
            path: 'overview',
            loadComponent: () =>
              import('./features/volleyball/overview-volleyball/overview-volleyball.component')
                .then(m => m.OverviewVolleyballComponent),
          },
          {
            path: 'teams',
            loadComponent: () =>
              import('./features/volleyball/teams/volleyball-team-form/volleyball-team-form.component')
                .then(m => m.VolleyballTeamFormComponent),
          },
          {
            path: 'matches',
            loadComponent: () =>
              import('./features/volleyball/matches/volleyball-match-form/volleyball-match-form.component')
                .then(m => m.VolleyballMatchFormComponent),
          },
          {
            path: 'tournaments',
            loadComponent: () =>
              import('./features/volleyball/tournaments/volleyball-tournaments-form.component')
                .then(m => m.volleyballTournamentsFormComponent),
          }
        ]
      },

      // ── Basketball ─────────────────────────────────────────────────
      {
        path: 'basketball',
        children: [
          {
            path: '',
            redirectTo: 'overview',
            pathMatch: 'full',
          },
          {
            path: 'overview',
            loadComponent: () =>
              import('./features/basketball/overview-basketball/overview-basketball.component')
                .then(m => m.OverviewBasketballComponent),
          },
          {
            path: 'teams',
            loadComponent: () =>
              import('./features/basketball/teams/basketball-team-form/basketball-team-form.component')
                .then(m => m.BasketballTeamFormComponent),
          },
          {
            path: 'matches',
            loadComponent: () =>
              import('./features/basketball/matches/basketball-match-form/basketball-match-form.component')
                .then(m => m.BasketballMatchFormComponent),
          },
          {
            path: 'tournaments',
            loadComponent: () =>
              import('./features/basketball/tournaments/basketball-tournaments-form.component')
                .then(m => m.basketballTournamentsFormComponent),
          }
        ]
      },

      // ── Settings ───────────────────────────────────────────────────
      /* {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settings.component')
            .then(m => m.SettingsComponent),
      }, */

      // ── Wildcard ───────────────────────────────────────────────────
      {
        path: '**',
        redirectTo: 'soccer/overview',
      },
    ],
  },
];
