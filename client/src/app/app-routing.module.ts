import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { ShopComponent } from './shop/shop.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'',component:HomeComponent, data:{breadcrumb: 'Home'}},
  {path:'shop', loadChildren:()=> import('./shop/shop.module').then(mod=>mod.ShopModule), data:{breadcrumb: 'Shop'}},
  {path:'basket', loadChildren:()=> import('./basket/basket.module').then(mod=>mod.BasketModule), data:{breadcrumb: 'Basket'}},
  {path:'**',redirectTo:'',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
