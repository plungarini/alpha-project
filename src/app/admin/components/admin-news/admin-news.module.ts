import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminNewsRoutingModule } from './admin-news-routing.module';
import { AdminNewsUsersComponent } from './components/admin-news-users/admin-news-users.component';
import { AdminNewsComponent } from './components/home/admin-news.component';
import { AdminNewsFormComponent } from './components/admin-news-form/admin-news-form.component';



@NgModule({
	declarations: [AdminNewsComponent, AdminNewsUsersComponent, AdminNewsFormComponent],
	imports: [
		CommonModule,
		AdminNewsRoutingModule,
		SharedModule,
		ReactiveFormsModule
	]
})
export class AdminNewsModule { }
