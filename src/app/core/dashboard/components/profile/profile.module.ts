import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './components/home/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
	declarations: [ProfileComponent, MyProfileComponent, NotificationsComponent],
	imports: [
		CommonModule,
		ProfileRoutingModule,
		SharedModule,
		ReactiveFormsModule
	]
})
export class ProfileModule { }
