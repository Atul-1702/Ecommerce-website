import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SignSuccessComponent } from './sign-success/sign-success.component';
import {CanActivate} from '@angular/router';
import { SellerGuardGuard } from './seller-guard.guard';
import { SellerAddproductComponent } from './seller-addproduct/seller-addproduct.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:'seller-auth',component:SellerAuthComponent},
  {path:'seller-sign-success',component:SignSuccessComponent,canActivate:[SellerGuardGuard]},
  {path:'seller-add-product',component:SellerAddproductComponent,canActivate:[SellerGuardGuard]},
  {path:'seller-update-product/:id',component:SellerUpdateProductComponent,canActivate:[SellerGuardGuard]},
  {path:'search-product/:query',component:SearchresultComponent},
  {path:'product-detail/:num',component:ProductDetailsComponent},
  {path:'user-auth',component:UserAuthComponent},
  {path:'cart',component:CartComponent},
  {path:'payment-page',component:PaymentComponent},
  {path:'order-placed',component:OrderPlacedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
