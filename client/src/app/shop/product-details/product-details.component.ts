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
  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService
  ) {
    this.bcService.set('@productDetails','');
  }

  product: IProduct;
  ngOnInit() {
    this.getProuctDetails();
  }

  getProuctDetails() {
    this.shopService
      .getProductById(this.activatedRoute.snapshot.paramMap.get("id"))
      .subscribe(
        (response) => {
          this.product = response;
          this.bcService.set('@productDetails',this.product.name)
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
