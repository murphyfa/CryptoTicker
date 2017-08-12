import { Component, OnInit } from '@angular/core';
import { TickerService } from './ticker.service';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs';

@Component({
  selector: 'my-app',
  template: `
  <h1>{{name}}</h1>
  <div *ngIf="ethdata">
  <h3>\${{ethdata.price | number : '1.2-2'}}</h3>
  <h3>{{ethdata.time | date:'h:mm:ssa MM/dd/yyyy'}}</h3>
  <div>
  <div *ngIf="highlow">
  <br>
  <h2>24 Hour High/Low</h2>
  <h3>High \${{highlow.high | number : '1.2-2'}} \| Low \${{highlow.low | number : '1.2-2'}}</h3>
  <h3>24h Volume: {{highlow.volume | number : '1.0-0'}}</h3>
  <div>`,
  providers: [TickerService]
})

export class AppComponent  {
   name = 'Shitty ETH Ticker';
   ethdata: {};
   highlow: {};
   private currentSub: Subscription;
   private daySub: Subscription;
   constructor(private _ticker: TickerService) {
   }

   ngOnInit() : void {
     let currentPriceTimer = Observable.timer(500,1000);
     let dayPriceTimer = Observable.timer(500,5000);
     this.currentSub = currentPriceTimer.subscribe(() => {
       this._ticker.getprice()
       .subscribe(data => this.ethdata = data);
     });
     this.daySub = dayPriceTimer.subscribe(() => {
       this._ticker.gethighlow()
       .subscribe(data => this.highlow = data);
     })
   }

   ngOnDestroy() {
     this.currentSub.unsubscribe();
   }
}
