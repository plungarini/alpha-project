import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { SubscriptionGuard } from './payment/guards/subscription.guard';



const routes: Routes = [
	{
		path: 'dashboard',
		canActivate: [AuthGuard, SubscriptionGuard],
		loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
	},
	{
		path: 'subscription',
		canActivate: [AuthGuard],
		loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule)
	},
	{
		path: 'workout',
		pathMatch: 'full',
		redirectTo: 'dashboard/workout'
	},
	{
		path: 'video',
		pathMatch: 'full',
		redirectTo: 'dashboard/video'
	},
	{
		path: 'profile',
		pathMatch: 'full',
		redirectTo: 'dashboard/profile'
	},
	{
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full',
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CoreRoutingModule { }
