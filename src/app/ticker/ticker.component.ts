import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { TickerService } from './ticker.service';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'ticker.html',
  styleUrls: ['ticker.css'],
  providers: [TickerService]
})

export class TickerComponent  {
    symbol: any;
    oldsymbol: any;
    ethdata: {};
    highlow: {};
    private sub: Subscription;
    private currentSub: Subscription;
    private daySub: Subscription;
    constructor(private _ticker: TickerService, private titleService: Title, private route: ActivatedRoute) {
        this.symbol = route.snapshot.params['ID'];
    }

   ngOnInit() : void {
     let currentPriceTimer = Observable.timer(0,1000);
     let dayPriceTimer = Observable.timer(0,1000);

     this.sub = this.route.params.subscribe(params => {
         this.symbol = params['ID'];
     })

     this.currentSub = currentPriceTimer.subscribe(() => {
       this._ticker.getprice(this.symbol)
       .subscribe(data => this.ethdata = data);
     });

     this.daySub = dayPriceTimer.subscribe(() => {
       this._ticker.gethighlow(this.symbol)
       .subscribe(data => this.highlow = data);
     })

     this.titleService.setTitle(this.symbol + ' to USD Crypto Ticker');

     console.log("STARTED");
   }

   ngOnChanges() {
     console.log("CHANGES");
   }

   ngDoCheck() {
     if (this.oldsymbol != this.symbol) {
       this.oldsymbol = this.symbol;
       this.ethdata = false;
       this.highlow = false;
       console.log("SYMBOL CHANGED");
     }
   }

   ngOnDestroy() {
     this.currentSub.unsubscribe();
     this.daySub.unsubscribe();
     this.sub.unsubscribe();
   }
}
