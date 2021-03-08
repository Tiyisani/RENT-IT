import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CalendarModule } from 'ion2-calendar';
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAHRThXn16BOpgoPuvISrV5lezUK5Y_isk",
  authDomain: "ionic-cab1.firebaseapp.com",
  databaseURL: "https://ionic-cab1.firebaseio.com",
  projectId: "ionic-cab1",
  storageBucket: "ionic-cab1.appspot.com",
  messagingSenderId: "228927464109",
  appId: "1:228927464109:web:2ed197667e79f5c0771c24",
  measurementId: "G-FB1TKEJT8D"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule,IonicModule.forRoot(), AppRoutingModule,CalendarModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
