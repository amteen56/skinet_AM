import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { IBrand } from "../shared/models/brands";
import { IProduct } from "../shared/models/products";
import { IType } from "../shared/models/productType";
import { ShopParam } from "../shared/models/ShopParam";
import { ShopService } from "./shop.service";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.scss"],
})
export class ShopComponent implements OnInit {
  @ViewChild('search',{static:false}) searchRef : ElementRef
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  totalCount : number;
  ShopParam = new ShopParam();

  sortOption = [
    { value: "Aphabetical", name: "name" },
    { value: "Price: Low to High", name: "PriceAsc" },
    { value: "Price: High to Low", name: "PriceDesc" },
  ];
  constructor(private shopService: ShopService) {}

  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService
      .getProducts(this.ShopParam)
      .subscribe(
        (response) => {
          this.products = response.data;
          this.ShopParam.pageNumber = response.pageIndex;
          this.ShopParam.pageSize = response.pageSize;
          this.totalCount = response.count;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  getBrands() {
    this.shopService.getBrands().subscribe(
      (response) => {
        this.brands = [{ id: 0, name: "All" }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getTypes() {
    this.shopService.getTypes().subscribe(
      (response) => {
        this.types = [{ id: 0, name: "All" }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onBrandSelected(brandid: number) {
    this.ShopParam.brandId = brandid;
    this.ShopParam.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.ShopParam.typeId = typeId;
    this.ShopParam.pageNumber = 1;
    this.getProducts();
  }

  onSorting(sort: string) {
    this.ShopParam.sort = sort;
    this.getProducts();
  }
  onPageChanged(event:any){
if(this.ShopParam.pageNumber !== event)
 {   this.ShopParam.pageNumber = event;
    this.getProducts();}
  }
  onSearch(){
    this.ShopParam.search = this.searchRef.nativeElement.value;
    this.ShopParam.pageNumber = 1;
    this.getProducts();
  }
  onReset(){
    this.searchRef.nativeElement.value = '';
    this.ShopParam = new ShopParam();
    this.getProducts();
  }
}
