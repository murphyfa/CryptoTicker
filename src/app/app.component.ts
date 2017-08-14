import { Component, OnInit, Input } from '@angular/core';
import { TickerService } from './ticker/ticker.service';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'nav.html',
  styleUrls: ['nav.css']
})

export class AppComponent  {
  isIn = false;   // store state
  toggleState() { // click handler
      let bool = this.isIn;
      this.isIn = bool === false ? true : false; 
  }
}
