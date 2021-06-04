/* eslint-disable @typescript-eslint/naming-convention */
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule, CONFIG, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOADING_BAR_CONFIG } from '@ngx-loading-bar/core';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,

    // AngularFire
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule
  ],
  providers: [
    { provide: LOADING_BAR_CONFIG, useValue: { latencyTreshold: 300 } },
    {
      provide: CONFIG,
      useValue: {
        send_page_view: true,
        DEBUG_MODE: true
      }
    },
    UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
