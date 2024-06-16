import { Component, OnInit } from '@angular/core';
import { Product, Summary, Usercart } from '../data_type';
import { UserService } from '../Service/user.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  summary_view=true;
  product:Usercart[]|undefined;
  summary:Summary={price:0,delivery:0,total:0,tax:0,discount:0};
  userLogged:boolean=false;
  constructor(private user:UserService) { }
  del_sty:Record<string,string>={};
  del_msg:string="";
  class_style:string="";
  ngOnInit(): void {
   let cus=localStorage.getItem('customer');
   
   if(!cus)
   {
    this.userLogged=false;
    let local=localStorage.getItem('cartdata');
    this.product=local&&JSON.parse(local);
    if(this.product&&this.product.length>0)
    {
        this.price_details(this.product);
    }
   }
   else
   {
     this.userLogged=true;
     let cus_id=cus&&JSON.parse(cus).id;
     this.user.get_cart_userid(cus_id).subscribe((result:Usercart[])=>{
       
       if(result.length>0)
       {
        this.price_details(result);
       }
     })
   }
  }
  price_details(result:Usercart[])
  {
    this.summary.price=0;
    result.forEach((item:Usercart)=>
       {
        if(item.quantity)
         {
          this.summary.price+=(+item.price/item.quantity)*item.quantity;
         }
       }
       )
       this.product=result;
       this.summary.tax=(this.summary.price*1)/100;
       this.summary.delivery=40;
       this.summary.discount=(this.summary.price*10)/100;
       this.summary.total=this.summary.price+this.summary.delivery+this.summary.tax-this.summary.discount;
       if(this.summary.price>=500)
       {
        this.summary.delivery=-40;
        this.summary.total-=40;
        this.del_sty={'font-weight':'bold','color':'green'};
        this.del_msg="Eligible for free delivery";
        this.class_style="alert alert-success fw-bold";
       }
       else
       {
        
        const req=(500-this.summary.price)
        let r_format=(Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',useGrouping:false}));
        this.del_msg="Add "+r_format.format(req)+" more for free delivery";
        this.class_style="alert alert-warning fw-bold";
       }
   }
   remove_item(item:number|undefined,pro_id:number)
   {
     let cart=localStorage.getItem('cartdata');
     let cus=localStorage.getItem('customer');
     if(!cus)
     {
      let cart_data:Usercart[]=cart&&JSON.parse(cart);
      if(item)
      {
        cart_data=cart_data.filter((local:Usercart)=>item!=local.id);
        this.product=cart_data;
        this.price_details(this.product);
        localStorage.setItem('cartdata',JSON.stringify(cart_data));
        this.user.cart_quantity();
        this.user.get_product_id(item).subscribe((result:Product)=>
        {
          result.quantity=1;
          this.user.update_quantity_product(result).subscribe((new_data)=>
          {
           console.log(new_data);
          }
          )
        }
        )
     }

   }
   else
   {
      
      let id:number=cus&&JSON.parse(cus).id;
      this.user.remove_product_productid(item).subscribe((result1)=>
      {
        this.user.get_cart_userid(id).subscribe((result2:Usercart[])=>
        {
          this.product=result2;
          this.price_details(this.product);
          this.user.get_product_id(pro_id).subscribe((result:Product)=>
        {
          result.quantity=1;
          this.user.update_quantity_product(result).subscribe((new_data)=>
          {
           console.log(new_data);
          }
          )
        }
        )
        }
        )
        this.user.cart_quantity();
      }
      )
   }
     
  }
  update_quantity(quan:number,p_id:number|undefined,limit:any)
  {
    if(!localStorage.getItem('customer'))
    {
      if(p_id&&quan==-1&&limit>1)
    {
      this.quantity_helper(-1,p_id); 
    }
    else
    {
      if(p_id&&quan==1&&limit<=4)
      {
        this.quantity_helper(1,p_id); 
      }
    }
  }
  else
  {
    p_id&&this.user.get_cart_id(p_id).subscribe((result:Usercart)=>
    {
      if(result&&result.quantity)
      {
        if(p_id&&quan==-1&&limit>1)
         {
          result.quantity+=quan;
          this.customer_update_helper(result,quan);
         }
        
          if(p_id&&quan==1&&limit<=4)
          { 
            result.quantity+=quan;
            this.customer_update_helper(result,quan);
          }
      }
      
    })
  }
  }
  quantity_helper(quan:number,p_id:number)
  {
    let local=localStorage.getItem('cartdata');
    let cart:Usercart[]=local&&JSON.parse(local);
    cart.forEach((item:Usercart)=>{
      if(item.id==p_id)
      {
        if(item.quantity)
        {
          item.quantity+=quan; 
          this.user.get_product_id(item.id).subscribe((result)=>
        {
          result.quantity=item.quantity;
          this.user.update_quantity_product(result).subscribe((new_data)=>
          {
           
          }
          )
        }
        )          
          item.price=Number(item.price)+Number((+item.price)/(item.quantity-quan))*quan;
        }
      }
    })
    this.product=cart;
    this.price_details(this.product);
    localStorage.setItem('cartdata',JSON.stringify(cart));
  }
  customer_update_helper(result:Usercart,quan:number)
  {
       if(result.quantity)
        result.price=Number(result.price)+Number((+result.price)/(result.quantity-quan))*quan
        this.user.product_exist(result).subscribe((result1)=>
        {
          let x=localStorage.getItem('customer');
          let id:number=x&&JSON.parse(x).id;
          this.user.get_cart_userid(id).subscribe((result1:Usercart[])=>
          {
            this.product=result1;
            this.price_details(this.product);
          } 
          )
        }
        )
        this.user.get_product_id(result.productid).subscribe((result2)=>
        {
          if(result2.quantity)
          result2.quantity+=quan;
          this.user.update_quantity_product(result2).subscribe((new_data)=>
          {
           
          }
          )
        }
        )
  }
  product_quantity(id:number|undefined,quan:number|undefined)
  {
   /* let cus=localStorage.getItem('customer');
    if(cus)
    {
      let cus_id=cus&&JSON.parse(cus).id;
      this.user.get_product_id(id).subscribe((result:Product)=>{
         result.quantity=quan;
         this.user.update_quantity_product(result).subscribe((new_data:Product)=>
         {
          console.log(new_data);
         }
         )
      })
    }
  */
  }
}
