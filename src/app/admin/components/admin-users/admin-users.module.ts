import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminUsersRoutingModule } from './admin-users-routing.module';
import { AdminUserDetailsComponent } from './components/admin-user-details/admin-user-details.component';
import { AdminUserFeedComponent } from './components/admin-user-feed/admin-user-feed.component';
import { AdminUsersComponent } from './components/home/admin-users.component';



@NgModule({
	declarations: [
		AdminUsersComponent,
		AdminUserDetailsComponent,
		AdminUserFeedComponent
	],
	imports: [
		CommonModule,
		AdminUsersRoutingModule,
		ReactiveFormsModule,
		SharedModule
	]
})
export class AdminUsersModule { }
