import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../models/brands';
import { IPagination } from '../models/pagination';
import { IType } from '../models/productType';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:7193/';
  constructor(private http: HttpClient) { }

  getProducts(brandId?: number, typeId?: number){
    var params = new HttpParams();

    if(brandId) params= params.append('brandId', brandId.toString());
    if(typeId) params= params.append('typeId', typeId.toString());

    return this.http.get<IPagination>(this.baseUrl + 'GetProducts', {observe: 'response', params})
    .pipe(
      map(response=> {
        return response.body;
      })
    )
  }

  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl + 'GetBrands')
  }

  getTypes(){
    return this.http.get<IType[]>(this.baseUrl + 'GetTypes')
  }
}
