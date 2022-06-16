import { BasketService } from './basket/basket.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Skinet';

  constructor(private BasketService: BasketService) {}

    ngOnInit(): void{
      const basketid = localStorage.getItem('basket_id');
      if(basketid){
        this.BasketService.getBasket(basketid).subscribe(()=>{
          console.log('initialzed basket');
        },error=>{
          console.log(error);
        })
      }
  }
}
