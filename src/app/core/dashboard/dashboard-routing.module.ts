import { SubscriptionGuard } from './../payment/guards/subscription.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { DashboardHomeComponent } from './components/dashboard-home/components/home/dashboard-home.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard, SubscriptionGuard],
        loadChildren: () => import('./components/dashboard-home/dashboard-home.module').then(m => m.DashboardHomeModule)
      },
      {
        path: 'workout',
        canActivate: [AuthGuard, SubscriptionGuard],
        loadChildren: () => import('./components/dashboard-workout/workout.module').then(m => m.WorkoutModule)
      },
      {
        path: 'video',
        canActivate: [AuthGuard, SubscriptionGuard],
        loadChildren: () => import('./components/dashboard-video/dashboard-video.module').then(m => m.DashboardVideoModule)
      },
      {
        path: 'profile',
        canActivate: [AuthGuard, SubscriptionGuard],
        loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
