/* eslint-disable @typescript-eslint/naming-convention */
import { NgModule } from '@angular/core';
import { getAnalytics, provideAnalytics } from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { CONFIG, ScreenTrackingService, UserTrackingService } from '@angular/fire/compat/analytics';
import { enableIndexedDbPersistence, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
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
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => {
				const firestore = getFirestore();
				/* connectEmulator(firestore, 'localhost', 8080); */
				enableIndexedDbPersistence(firestore);
				return firestore;
		}),
		provideStorage(() => getStorage()),
		provideAnalytics(() => getAnalytics())
  ],
  providers: [
    { provide: LOADING_BAR_CONFIG, useValue: { latencyTreshold: 300 } },
    {
      provide: CONFIG,
      useValue: {
        send_page_view: true,
        DEBUG_MODE: false
      }
    },
		UserTrackingService,
		ScreenTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
