import { BasketService } from './../../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasketTotal } from './../../models/Basket';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent implements OnInit {
bastetTotal$ : Observable<IBasketTotal>;
  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.bastetTotal$ = this.basketService.basketTotal$;
  }


}
