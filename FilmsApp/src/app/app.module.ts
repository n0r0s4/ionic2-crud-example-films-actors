import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Films } from '../pages/films/films';
import { Actors } from '../pages/actors/actors';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FilmDetail } from '../pages/film-detail/film-detail';
import { FilmService } from '../providers/film-service/film-service';
import { ActorService } from '../providers/actor-service/actor-service';
import { ActorDetail } from '../pages/actor-detail/actor-detail';

@NgModule({
  declarations: [
  MyApp,
  HomePage,
  Films,
  FilmDetail,
  Actors,
  ActorDetail,
  TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Films,
    FilmDetail,
    Actors,
    ActorDetail,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ActorService,
    FilmService
  ]
})
export class AppModule {}
