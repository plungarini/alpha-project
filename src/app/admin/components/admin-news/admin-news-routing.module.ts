import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminNewsComponent } from './components/home/admin-news.component';

const routes: Routes = [{ path: '', component: AdminNewsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminNewsRoutingModule { }
