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

  constructor() {}
  
    ngOnInit(): void{
  }
}
