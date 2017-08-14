import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TickerComponent }  from './ticker/ticker.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpModule } from "@angular/http";
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Current/:ID', component: TickerComponent }
];

@NgModule({
  imports:      [ BrowserModule,HttpModule,RouterModule.forRoot(appRoutes) ],
  declarations: [ TickerComponent, AppComponent, HomeComponent ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
