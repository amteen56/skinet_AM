import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { IProduct } from './models/products';
import { IPagination } from './models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Skinet';
  products: IProduct[];

  constructor(private http: HttpClient) {}
     
    ngOnInit(): void{
      this.http.get('https://localhost:7193/GetProducts?PageSize=50').subscribe((response: IPagination)=>{
        this.products = response.data;
      }, error=>{
        console.log(error);
      })
  }
}
