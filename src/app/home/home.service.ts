import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class HomeService {
    constructor(private http: Http){}

    getETH() {
        let ethurl='https://api.gdax.com/products/ETH-USD/ticker';
        return this.http.get(ethurl)
        .map(response => response.json());
    }

    getBTC() {
        let ethurl='https://api.gdax.com/products/BTC-USD/ticker';
        return this.http.get(ethurl)
        .map(response => response.json());
    }

    getLTC() {
        let ethurl='https://api.gdax.com/products/LTC-USD/ticker';
        return this.http.get(ethurl)
        .map(response => response.json());
    }
}