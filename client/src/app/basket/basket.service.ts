import { IProduct } from "./../shared/models/products";
import { HttpClient } from "@angular/common/http";
import { Basket, IBasket, IBasketItem } from "./../shared/models/Basket";
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

  constructor(private http: HttpClient) {}
  getBasket(id: string) {
    return this.http.get(this.baseUrl + "basket?id=" + id).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        console.log(this.getCurrentBasketValue());
      })
    );
  }
  v;
  setBasket(basket: IBasket) {
    console.log("basket");
    console.log(basket);
    return this.http.post(this.baseUrl + 'basket', basket).subscribe(
      (response: IBasket) => {
        this.basketSource.next(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);
    let basket = this.getCurrentBasketValue();
    console.log(basket);
    if(basket == null || basket.items == null) basket = this.createBasket();
    basket.items = this.addOrUpdateItems(basket.items, itemToAdd, quantity);
    console.log(basket);
    this.setBasket(basket);
  }

  private addOrUpdateItems(
    items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
      const index = items.findIndex(i => i.id === itemToAdd.id);
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
