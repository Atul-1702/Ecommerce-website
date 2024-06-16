import { Component, OnInit } from '@angular/core';
import { SellerAddProductService } from '../Service/seller-add-product.service';
import { Product, Usercart } from '../data_type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  popularproduct:Product[]|undefined;
  trendyproduct:Product[]|undefined;
  constructor(private service:SellerAddProductService) { 
    
  }

  ngOnInit(): void {
    this.service.popular_products().subscribe((result:Product[])=>
    {
      this.popularproduct=result;
    }
   )
   this.service.trendy_products().subscribe((result:Product[])=>
    {
       this.trendyproduct=result;
    })
  }
 

}
