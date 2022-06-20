import { IProduct } from "./../shared/models/products";
import { HttpClient } from "@angular/common/http";
import {
  Basket,
  IBasket,
  IBasketItem,
  IBasketTotal,
} from "./../shared/models/Basket";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotal>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) {}
  getBasket(id: string) {
    return this.http.get(this.baseUrl + "basket?id=" + id).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        this.calculateTotal();
      })
    );
  }
  v;
  setBasket(basket: IBasket) {
    console.log("basket");
    console.log(basket);
    return this.http.post(this.baseUrl + "basket", basket).subscribe(
      (response: IBasket) => {
        this.basketSource.next(response);
        this.calculateTotal();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  incrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const index = basket.items.findIndex((x) => x.id === item.id);
    basket.items[index].quantity++;
    this.setBasket(basket);
  }
  decrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const index = basket.items.findIndex((x) => x.id === item.id);
    if(basket.items[index].quantity>1){
      basket.items[index].quantity--;
      this.setBasket(basket);
    }
    else{
      this.removeItemfromBasket(item);
    }
  }
  removeItemfromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if(basket.items.some(x=>x.id === item.id)){
      basket.items = basket.items.filter(x=> x.id != item.id);
      if(basket.items.length > 0 ){
        this.setBasket(basket);
      }else{
        this.deleteBasket(basket);
      }
    }
  }
  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(()=>{
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');
    },error=>{
      console.log(error);
    });
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(
      item,
      quantity
    );
    let basket = this.getCurrentBasketValue();
    console.log(basket);
    if (basket == null || basket.items == null) basket = this.createBasket();
    basket.items = this.addOrUpdateItems(basket.items, itemToAdd, quantity);
    console.log(basket);
    this.setBasket(basket);
  }

  private addOrUpdateItems(
    items: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    const index = items.findIndex((i) => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem("basket_id", basket.id);
    return basket;
  }
  private calculateTotal() {
    const basket = this.getCurrentBasketValue();
    console.log(basket);
    const shippmentCost = 0;
    const subTotal = basket.items.reduce((a, b) => b.price * b.quantity + a, 0);
    const Total = shippmentCost + subTotal;
    this.basketTotalSource.next({ shippmentCost, subTotal, Total });
  }

  private mapProductItemToBasketItem(
    item: IProduct,
    quantity: number
  ): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType,
    };
  }
}
