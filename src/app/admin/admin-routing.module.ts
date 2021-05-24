import { AdminVideoComponent } from './components/admin-video/admin-video.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminNewsComponent } from './components/admin-news/components/home/admin-news.component';
import { AdminUsersComponent } from './components/admin-users/components/home/admin-users.component';
import { AdminComponent } from './components/dashboard/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AdminHomeComponent
      },
      {
        path: 'workout',
        loadChildren: () => import('./components/admin-workout-plans/admin-workout-plans.module').then((m) => m.AdminWorkoutPlansModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./components/admin-users/admin-users.module').then((m) => m.AdminUsersModule),
      },
      {
        path: 'video',
        component: AdminVideoComponent
      },
      {
        path: 'news',
        component: AdminNewsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
