import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardVideoComponent } from './components/home/dashboard-video.component';
import { DashboardVideoRoutingModule } from './dashboard-video-routing.module';



@NgModule({
	declarations: [DashboardVideoComponent],
	imports: [
		CommonModule,
		DashboardVideoRoutingModule,
		HttpClientModule,
		SharedModule
	]
})
export class DashboardVideoModule { }
