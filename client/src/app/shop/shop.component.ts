import { Component, OnInit } from "@angular/core";
import { IBrand } from "../models/brands";
import { IProduct } from "../models/products";
import { IType } from "../models/productType";
import { ShopService } from "./shop.service";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.scss"],
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  brandIdSelected = 0;
  typeIdSelected = 0;
  constructor(private shopService: ShopService) {}

  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService
      .getProducts(this.brandIdSelected, this.typeIdSelected)
      .subscribe(
        (response) => {
          this.products = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  getBrands() {
    this.shopService.getBrands().subscribe(
      (response) => {
        this.brands = [{id:0, name: 'All'}, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getTypes() {
    this.shopService.getTypes().subscribe(
      (response) => {
        this.types =  [{id:0, name: 'All'}, ...response];;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onBrandSelected(brandid: number) {
    this.brandIdSelected = brandid;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.typeIdSelected = typeId;
    this.getProducts();
  }
}