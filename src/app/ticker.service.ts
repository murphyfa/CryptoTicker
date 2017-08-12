import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class TickerService {
    private ethurl='https://api.gdax.com/products/ETH-USD/ticker';
    private ethhighlow='https://api.gdax.com/products/ETH-USD/stats';
    constructor(private http: Http){}

    getprice() {
        return this.http.get(this.ethurl)
        .map(response => response.json());
    }

    gethighlow() {
        return this.http.get(this.ethhighlow)
        .map(response => response.json());
    }
}