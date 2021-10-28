import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaymentComponent } from './components/home/payment.component';
import { PaymentRoutingModule } from './payment-routing.module';



@NgModule({
	declarations: [PaymentComponent],
	imports: [
		CommonModule,
		PaymentRoutingModule,
		SharedModule
	],
})
export class PaymentModule { }
