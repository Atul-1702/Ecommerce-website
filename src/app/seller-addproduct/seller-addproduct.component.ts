import { Component, OnInit } from '@angular/core';
import { Product } from '../data_type';
import { SellerAddProductService } from '../Service/seller-add-product.service';
import { timeout } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-addproduct',
  templateUrl: './seller-addproduct.component.html',
  styleUrls: ['./seller-addproduct.component.css']
})
export class SellerAddproductComponent implements OnInit {
  add_status:String|undefined;
  constructor(private service:SellerAddProductService,private router:Router) { }

  ngOnInit(): void {
  }
  add_product(formdata:Product)
  {
       this.service.send_product(formdata).subscribe((result:any)=>
        {
          if(result)
          {
            this.add_status="Product is added successfully"    
            setTimeout(()=>(this.router.navigate(['/seller-sign-success'])),3000);
          }
          
        }       
          )
  }
}
