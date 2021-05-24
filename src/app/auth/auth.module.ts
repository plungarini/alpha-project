import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingBarModule, LOADING_BAR_CONFIG } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/auth-component/auth.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SocialLoginComponent } from './components/social-login/social-login.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    SocialLoginComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgxBootstrapIconsModule.pick(allIcons), // TODO Fix
    FormsModule,
    LoadingBarRouterModule,
    LoadingBarModule
  ],
  providers: [
    { provide: LOADING_BAR_CONFIG, useValue: { latencyTreshold: 300 } }
  ]
})
export class AuthModule { }
