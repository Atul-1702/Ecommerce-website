import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../Service/user.service';
import { Login, Product, Signup, Usercart } from '../data_type';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  form_toggle:boolean=true;
  check_cred:boolean=false;
  cartPage=false;
  active:ActivatedRoute=inject(ActivatedRoute);
  constructor(private userservice:UserService,private route:Router) { }
  FormData:FormGroup=new FormGroup(
    { 
     name:new FormControl('',[Validators.required]),
     email:new FormControl('',[Validators.required,Validators.email]),
     password:new FormControl('',[Validators.required])
    }
  );
  ngOnInit(): void {
        this.active.queryParamMap.subscribe((query)=>
        {
          if(query.get('cartpage'))
           this.cartPage=true;
          else
          this.cartPage=false;
        }
        )
  }
  submit_data()
  {
    this.userservice.submit_user_data(this.FormData.value).subscribe((result)=>
      {
        localStorage.setItem('customer',JSON.stringify(result));
        this.route.navigate(["/"]);
      }
      )
      
  }
  check_user(data:Login)
  {
    this.userservice.login_user(data).subscribe((result:Login[])=>
      {
      
        if(result.length!=0)
        {
          if(this.cartPage==false)
            this.route.navigate(['/']);
          localStorage.setItem('customer',JSON.stringify(result[0]));
          this.check_cred=false;
          let local_store=localStorage.getItem('cartdata');
        if(local_store)
      {
        let u_id=localStorage.getItem('customer');
         let x=u_id&&JSON.parse(u_id).id;
         let local_cart:Product[]=JSON.parse(local_store);
         local_cart.forEach((item)=>{
           let cart:Usercart={
            ...item,
            productid:item.id,
            userid:result[0].id,
            id:undefined,
           }
              this.userservice.get_cart_productid(x,item.id).subscribe((result:Usercart[])=>{
              if(result.length>0)
              {
                 if(result[0].quantity&&item.quantity)
                  result[0].quantity+=item.quantity;
                  this.userservice.product_exist(result[0]).subscribe((result)=>
                  {
                     
                  }
                  )
              }
              else
              {
                this.userservice.post_cart_product(cart).subscribe((result)=>
           {
            if(this.cartPage==true)
              {
                this.route.navigate(["cart"]);
              }    
                
              })
            }

            
          })
        })
        
      }
    }
        else
        {
         
          this.check_cred=true;
        }
        if(localStorage.getItem('cartdata'))
            {
              localStorage.removeItem('cartdata');
            } 
            setTimeout(()=>this.userservice.cart_quantity(),500);
      }
      )
     
      
  }
  form_change()
  {
    this.form_toggle=!this.form_toggle;
  }
}
