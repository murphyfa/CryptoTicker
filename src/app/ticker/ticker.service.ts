import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class TickerService {
    constructor(private http: Http){}

    getprice(symbol: string) {
        let ethurl='https://api.gdax.com/products/' + symbol + '-USD/ticker';
        return this.http.get(ethurl)
        .map(response => response.json());
    }

    gethighlow(symbol: string) {
        let ethhighlow='https://api.gdax.com/products/' + symbol + '-USD/stats';
        return this.http.get(ethhighlow)
        .map(response => response.json());
    }

    gethistoricaldata(symbol: string) {
        let currentTime = new Date().toISOString();
        currentTime = currentTime.split('.')[0]+"Z";
        let date = new Date().setDate(new Date().getDate()-1);
        let pastTime = new Date(date).toISOString();
        pastTime = pastTime.split('.')[0]+"Z";
        console.log(currentTime);
        console.log(pastTime);
        let candleurl='https://api.gdax.com/products/' + symbol + '-USD/candles?start=' + pastTime + '&end=' + currentTime + '&granularity=900';
        return this.http.get(candleurl)
        .map(response => response.json());
    }


}