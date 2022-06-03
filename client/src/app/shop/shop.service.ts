import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/brands';
import { IPagination } from '../shared/models/pagination';
import { IType } from '../shared/models/productType';
import {map} from 'rxjs/operators';
import { ShopParam } from '../shared/models/ShopParam';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:7193/';
  constructor(private http: HttpClient) { }

  getProducts(shopParam: ShopParam){
    var params = new HttpParams();

    if(shopParam.brandId) params= params.append('brandId', shopParam.brandId.toString());
    if(shopParam.typeId) params= params.append('typeId', shopParam.typeId.toString());
    if(shopParam.sort)params= params.append('Sort', shopParam.sort.toString());
    if(shopParam.pageNumber)params= params.append('PageIndex', shopParam.pageNumber.toString());
    if(shopParam.pageSize)params= params.append('PageSize', shopParam.pageSize.toString());
    if(shopParam.search)params= params.append('Search', shopParam.search.toString());

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
