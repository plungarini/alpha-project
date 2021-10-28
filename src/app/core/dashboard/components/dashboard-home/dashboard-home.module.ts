import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardHomeComponent } from './components/home/dashboard-home.component';
import { WelcomeBannerComponent } from './components/welcome-banner/welcome-banner.component';
import { WorkoutBannerComponent } from './components/workout-banner/workout-banner.component';
import { DashboardHomeRoutingModule } from './dashboard-home-routing.module';
import { VideoBannerComponent } from './components/video-banner/video-banner.component';



@NgModule({
	declarations: [
		DashboardHomeComponent,
		WelcomeBannerComponent,
		WorkoutBannerComponent,
		VideoBannerComponent
	],
	imports: [
		CommonModule,
		DashboardHomeRoutingModule,
		SharedModule
	]
})
export class DashboardHomeModule { }
