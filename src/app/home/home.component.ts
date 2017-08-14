import { Component, OnInit, Input } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { HomeService } from './home.service';

@Component({
  selector: 'app-root',
  templateUrl: 'home.html',
  styleUrls: ['home.css'],
  providers: [HomeService]
})

export class HomeComponent {
  ethPrice: number;
  btcPrice: number;
  ltcPrice: number;
  constructor(private service: HomeService) {}

  ngOnInit() : void {
    let currentPriceTimer = Observable.timer(0,3000);

    // Current ETH Price
    currentPriceTimer.subscribe(() => {
      this.service.getETH()
      .subscribe(data => {
        this.ethPrice = data.price;
      }); 
    });

    // Current BTC Price
    currentPriceTimer.subscribe(() => {
      this.service.getBTC()
      .subscribe(data => {
        this.btcPrice = data.price;
      }); 
    });

    // Current LTC Price
    currentPriceTimer.subscribe(() => {
      this.service.getLTC()
      .subscribe(data => {
        this.ltcPrice = data.price;
      }); 
    });
  }
}