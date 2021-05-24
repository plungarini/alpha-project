import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingBarModule, LOADING_BAR_CONFIG } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotificationsComponent } from './components/dashboard-content/components/notifications/notifications.component';
import { DashboardContentComponent } from './components/dashboard-content/dashboard-content.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';



@NgModule({
  declarations: [
    DashboardComponent,
    DashboardContentComponent,
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    LoadingBarRouterModule,
    LoadingBarModule
  ],
  providers: [
    { provide: LOADING_BAR_CONFIG, useValue: { latencyTreshold: 300 } }
  ]
})
export class DashboardModule { }
