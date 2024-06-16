import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SellerAddProductService } from '../Service/seller-add-product.service';
import { Product,Usercart } from '../data_type';
import { UserService } from '../Service/user.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product:Product={name:'',price:0,color:'',description:'',category:'',image:'',id:0,quantity:0};
  p_quantity:number=1;
  add_remove:boolean=true;
  quantity_control=true;
  max_quantity=5;
  constructor(private data:ActivatedRoute,private service:SellerAddProductService,private user_service:UserService) {
  }

  ngOnInit(): void {
    let query=this.data.snapshot.paramMap.get('num');
    
      query&&this.service.get_product_id(query).subscribe((result:Product)=>
      {
        if(result.quantity)
        {
          this.p_quantity=result.quantity;
        }
        this.product=result;
      })
    let p=localStorage.getItem('cartdata');
    let pro:Product[]=p&&JSON.parse(p);
    let cus=localStorage.getItem('customer');
    if(!cus)
    {
      if((pro.filter((get)=>get.id==Number(query))).length!=0)
    {
      this.add_remove=false;
      this.quantity_control=false;
    }
    else
    {
      this.add_remove=true;
      this.quantity_control=true;
    }
  }
  else
  {
    let cus_id:number=JSON.parse(cus).id;
    query&&this.user_service.get_cart_productid(cus_id,Number(query)).subscribe((result:Usercart[])=>
    {
       if(result.length>=1)
       { 
         this.add_remove=false;
         this.quantity_control=false;
       }
       else
       {
        this.add_remove=true;
        this.quantity_control=true;
       }
    }
    )
  }
  }
  product_quantity(inc_dec:number)
  {
    if(inc_dec==-1&&this.p_quantity>1)
    { 
      this.p_quantity+=inc_dec;
    }
    if(inc_dec==1&&this.p_quantity<this.max_quantity)
    {
      this.p_quantity+=inc_dec;
    }
  }
  add_to_cart(id:number|undefined)
  {
    this.quantity_control=false;
    let cartdata:Product[]=[];
    this.add_remove=!this.add_remove;
    let cus=localStorage.getItem('customer')
    if(!cus)
    {
    this.user_service.get_product_id(id).subscribe((result:Product)=>
    {
        result.quantity=this.p_quantity;
        this.user_service.update_quantity_product(result).subscribe((new_data:Product)=>{      
          
         })
         if(result.quantity>1)
         result.price=(result.price)*result.quantity;
        if(!localStorage.getItem('cartdata'))
        {
          localStorage.setItem('cartdata',JSON.stringify([result]));
        }
        else
        { 
          let cart=[];
          let p=localStorage.getItem('cartdata');
          cart=p&&JSON.parse(p);
          cart.push(result);
          localStorage.setItem('cartdata',JSON.stringify(cart))
        }
        this.user_service.cart_quantity();
    }
    );
    }
    else
    { 
      let cus_id=(localStorage.getItem('customer'));
      cus_id=cus_id&&JSON.parse(cus_id).id;
      this.user_service.get_product_id(id).subscribe((result:Product)=>
        {
            result.quantity=this.p_quantity;
            this.user_service.update_quantity_product(result).subscribe((new_data:Product)=>{      
            if(result.quantity&&result.quantity>1)
            {
              result.price=(result.price*result.quantity);
            }
            let cart:Usercart={
             ...result,
             productid:result.id,
             userid:Number(cus_id),
             quantity:this.p_quantity,
             id:undefined,
            }          
            this.user_service.post_cart_product(cart).subscribe(result=>
              {
                this.user_service.cart_quantity();
              })
            })  
       }     
        )
        
    }
  }
  remove_to_cart(id:number)
  {
     this.quantity_control=true;
     let cus=localStorage.getItem('customer');
     if(!cus)
     {
      
     let p=(localStorage.getItem('cartdata'));
     let pro=p&&JSON.parse(p);
     pro=pro.filter((result:Product)=>result.id!=id)
     if(pro.length>0)
     {
      localStorage.setItem('cartdata',JSON.stringify(pro));
     }
     else
     {
      localStorage.removeItem('cartdata');
     }
     this.add_remove=!this.add_remove;
     this.p_quantity=1;
     this.user_service.cart_quantity();
     this.user_service.get_product_id(id).subscribe((result:Product)=>
     {
       result.quantity=1;
       this.user_service.update_quantity_product(result).subscribe((result)=>
       {
          
       }
       )
     })
    }
    else
    {
      let cus_id:number=JSON.parse(cus).id;
      this.user_service.get_cart_user_product(cus_id,id).subscribe((result:Usercart[])=>
      {
          if(result.length>0)
          {
            this.user_service.remove_product_productid(result[0].id).subscribe((result1:Usercart[])=>{
           
            this.add_remove=!this.add_remove;
            this.p_quantity=1;
            if(result[0].quantity)
            {
             var x=result[0].quantity;
             let old_data:Product={
             name:result[0].name,
             price:result[0].price/x,
             category:result[0].category,
             quantity:1,
             color:result[0].color,
             image:result[0].image,
             id:result[0].productid,
             description:result[0].description
            }
            this.user_service.update_quantity_product(old_data).subscribe((new_data:Product)=>{      
              this.user_service.cart_quantity();
             })
           }
          
          
          })
          }
      })
      
    }
     
  }
}
