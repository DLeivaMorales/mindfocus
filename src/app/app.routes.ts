import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'timer',
    loadComponent: () => import('./timer/timer.page').then(m => m.TimerPage)
  },
  {
    path: 'notification',
    loadComponent: () => import('./notification/notification.page').then(m => m.NotificationPage)
  }
];
