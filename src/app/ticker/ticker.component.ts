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
    pricedata: any;
    highlow: any;
    price: number;
    high: number;
    low: number;
    open: number;
    volume: number;
    last: number;
    valueChange: string;
    percentChange: string;
    isgain: boolean;

    private sub: Subscription;
    private currentSub: Subscription;
    private daySub: Subscription;
    constructor(private _ticker: TickerService, private titleService: Title, private route: ActivatedRoute) {
        this.symbol = route.snapshot.params['ID'];
    }

   ngOnInit() : void {
     let currentPriceTimer = Observable.timer(0,1000);
     let dayPriceTimer = Observable.timer(0,1000);
     
     // Checking for when a different coin is selected in view
     this.route.params.subscribe(params => {
         this.symbol = params['ID'];
     });

     // Subs to the current price
     currentPriceTimer.subscribe(() => {
        this._ticker.getprice(this.symbol)
        .subscribe(data => {
          this.pricedata = true;
          this.price = data.price;
        });
     });

     // Subs to the 24 hour stats 
     dayPriceTimer.subscribe(() => {
       this._ticker.gethighlow(this.symbol)
       .subscribe(data => {
         this.highlow = true;
         this.high = data.high;
         this.low = data.low;
         this.open = data.open;
         this.volume = data.volume;
         this.last = data.last;

         if (this.last > this.open) {
           this.percentChange = '+' + (((this.last-this.open)/this.open)*100).toFixed(2) + '%';
           this.valueChange = '+$' + (this.last-this.open).toFixed(2);
           this.isgain = true;
         }
         else {
           this.percentChange = (((this.last-this.open)/this.open)*100).toFixed(2) + '%';
           this.valueChange = '-$' + ((this.last-this.open)*-1).toFixed(2);
           this.isgain = false;
         }
       });
     });

     // Updates the page title
     this.titleService.setTitle(this.symbol + ' to USD Crypto Ticker');
   }

   ngDoCheck() {
     // This causes the view to go blank until new data is pulled
     // It makes it look as if data for the selected coin is being loaded rather than just showing the same values for a second before changing
     if (this.oldsymbol != this.symbol) {
       this.oldsymbol = this.symbol;
       this.pricedata = false;
       this.highlow = false;
     }
     // Shows the current price on the browser tab
     if (this.price > 0) {
       let titlePrice = (this.price*1).toFixed(2);
       this.titleService.setTitle('$' + titlePrice + ' ' + this.symbol + ' to USD Crypto Ticker');     
     }
   }

   /*
   ngOnDestroy() {
     this.currentSub.unsubscribe();
     this.daySub.unsubscribe();
     this.sub.unsubscribe();
   }
   */
}
