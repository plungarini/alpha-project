import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingBarModule, LOADING_BAR_CONFIG } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { AdminVideoComponent } from './components/admin-video/admin-video.component';
import { AdminComponent } from './components/dashboard/admin.component';



@NgModule({
	declarations: [
		AdminComponent,
		AdminSidebarComponent,
		AdminHomeComponent,
		AdminVideoComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		AdminRoutingModule,
		ReactiveFormsModule,
		LoadingBarRouterModule,
		LoadingBarModule,
	],
	providers: [
		{ provide: LOADING_BAR_CONFIG, useValue: { latencyTreshold: 300 } }
	]
})
export class AdminModule { }
