import { IBasketItem } from './../shared/models/Basket';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IBasket } from '../shared/models/Basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basket$ : Observable<IBasket>
  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.basket$ = this.basketService.basket$;
  }
  decrementItemQuantity(item: IBasketItem){
    this.basketService.decrementItemQuantity(item);
  }
  removeBasketItem(item: IBasketItem){
    this.basketService.removeItemfromBasket(item);
  }
  incrementItemQuantity(item: IBasketItem){
    this.basketService.incrementItemQuantity(item);
  }

}
