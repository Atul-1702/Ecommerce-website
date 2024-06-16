import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { Product, Signup, Usercart } from '../data_type';
import { ServiceService } from '../Service/service.service';
import { SignSuccessComponent } from '../sign-success/sign-success.component';
import { SellerAddProductService } from '../Service/seller-add-product.service';
import { UserService } from '../Service/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  toggle:string="";
  status:boolean=false;
  Name:string|null=null;
  data:any="";
  searchproducts:Product[]|undefined;
  user_name:string|null=null;
  user_data:any="";
  cart_quantity=0;
  constructor(private router:Router,public service:SellerAddProductService,public user:UserService) {
    
   
  }
  ngOnInit(): void {
  
    this.router.events.subscribe((value:any)=>
    {
     if(value.url)
      {if(localStorage.getItem('user')&&value.url.includes('seller'))
      {
         this.toggle="seller";
         this.Name=localStorage.getItem('user');
         if(this.Name!=null)
         {
          this.data=JSON.parse(this.Name);
         }
    }
      else
      {
        if(localStorage.getItem('customer'))
        {
          this.toggle="customer"
          this.user_name=localStorage.getItem('customer');
          if(this.user_name!=null)
          {
            this.user_data=JSON.parse(this.user_name);
            
          }
        }
        else
        {
          this.toggle="normal";
        }
      }
    } 
  })
  
 
    }
  
   change()
   {
    this.status=!this.status;
   }
  logout()
  {
    localStorage.removeItem('user');
    this.router.navigate(["seller-auth"]);
    
  }
  search_product(target:any)
  {
   
      this.service.fetch_product(target.value).subscribe((result:Product[])=>
     {
       this.searchproducts=result;
     });
  
}
empty()
{
 
  this.searchproducts=undefined;
}
send_query(query:String)
{
 this.router.navigate(['/search-product',query]);
 
}
delete_user()
{
  localStorage.removeItem('customer');
  this.user.cart_quantity();
}

}
