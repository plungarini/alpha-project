import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardVideoComponent } from './components/home/dashboard-video.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardVideoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardVideoRoutingModule { }
