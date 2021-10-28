import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { InlineSVGModule } from 'ng-inline-svg';
import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { AlertComponent } from './components/alert/alert.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { GlobalSidebarComponent } from './components/global-sidebar/global-sidebar.component';
import { NotificationDetailComponent } from './components/notification-detail/notification-detail.component';
import { PathSvgComponent } from './components/path-svg/path-svg.component';
import { DropdownComponent } from './components/tailwind/dropdown/dropdown.component';
import { ModalComponent } from './components/tailwind/modal/modal.component';
import { TooltipComponent } from './components/tailwind/tooltip/tooltip.component';
import { VimeoPlayerComponent } from './components/vimeo-player/vimeo-player.component';
import { WorkoutIconSelectorComponent } from './components/workout-icon-selector/workout-icon-selector.component';
import { YoutubePlayerComponent } from './components/youtube-player/youtube-player.component';
import { BaseRoleDirective } from './directives/role-guard.directive';
import { SafeUrlPipe } from './pipes/safe-url.pipe';



@NgModule({
	declarations: [
		GlobalSidebarComponent,
		AvatarComponent,
		DropdownComponent,
		TooltipComponent,
		PathSvgComponent,
		WorkoutIconSelectorComponent,
		BaseRoleDirective,
		ModalComponent,
		VimeoPlayerComponent,
		YoutubePlayerComponent,
		SafeUrlPipe,
		AlertComponent,
		NotificationDetailComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		NgxBootstrapIconsModule.pick(allIcons),
		HttpClientModule,
		InlineSVGModule.forRoot(),
		YouTubePlayerModule,
	],
	exports: [
		SafeUrlPipe,
		GlobalSidebarComponent,
		AvatarComponent,
		DropdownComponent,
		NgxBootstrapIconsModule,
		PathSvgComponent,
		WorkoutIconSelectorComponent,
		BaseRoleDirective,
		ModalComponent,
		VimeoPlayerComponent,
		YoutubePlayerComponent,
		AlertComponent,
		NotificationDetailComponent,
	]
})
export class SharedModule { }
