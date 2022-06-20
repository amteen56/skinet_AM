import { BasketService } from "./../../basket/basket.service";
import { IProduct } from "./../../shared/models/products";
import { ShopService } from "./../shop.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BreadcrumbService } from "xng-breadcrumb";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity: number;


  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService
  ) {
    this.bcService.set("@productDetails", "");
  }



  ngOnInit() {
    this.getProuctDetails();
    this.quantity = 1;
  }

  getProuctDetails() {
    this.shopService
      .getProductById(this.activatedRoute.snapshot.paramMap.get("id"))
      .subscribe(
        (response) => {
          this.product = response;
          this.bcService.set("@productDetails", this.product.name);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  incremenetQuantity() {
    this.quantity++;
  }
  decerementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }
}
