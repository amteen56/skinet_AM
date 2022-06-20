import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { PaginationHeaderComponent } from "./componenets/pagination-header/pagination-header.component";
import { PagerComponent } from "./componenets/pager/pager.component";
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './componenets/order-totals/order-totals.component';

@NgModule({
  declarations: [PaginationHeaderComponent, PagerComponent, OrderTotalsComponent, OrderTotalsComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot()
  ],
  exports: [
    PaginationModule,
    PaginationHeaderComponent,
    PagerComponent,
    CarouselModule,
    OrderTotalsComponent
  ]
})
export class SharedModule {}
