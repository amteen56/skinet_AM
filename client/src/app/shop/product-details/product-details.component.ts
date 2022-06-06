import { IProduct } from './../../shared/models/products';
import { ShopService } from './../shop.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute) { }

  product : IProduct
  ngOnInit() {
    this.getProuctDetails();
  }

  getProuctDetails() {
    this.shopService.getProductById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (response) => {
        this.product = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
