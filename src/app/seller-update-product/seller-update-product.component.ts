import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerAddProductService } from '../Service/seller-add-product.service';
import { Product } from '../data_type';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  id:string|null=null;
  product:Product|undefined;
  constructor(private route:ActivatedRoute,private service:SellerAddProductService,private r:Router) { }

  ngOnInit(): void {
       this.id=this.route.snapshot.paramMap.get('id');
       if(this.product!=undefined)
       {
        this.product.id=Number(this.id);
       }
       this.id&&this.service.get_product_id(this.id).subscribe((result:Product)=>
       {
           
           if(result)
           {
            this.product=result;
           }
       }
       )
  }
  update_product(value:Product)
  {
        
        if(this.product!=undefined)
        this.service.change_product(this.product.id,value).subscribe((result)=>
        {
           this.r.navigate(["/seller-sign-success"]);
        }
        );
  }
}
