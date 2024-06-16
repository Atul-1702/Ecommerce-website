import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, Product, Signup, Usercart } from '../data_type';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  cart_q:number|undefined;
  constructor(private http:HttpClient) { 
   
    let p=localStorage.getItem('cartdata');
    let cus=localStorage.getItem('customer');
    if(!cus)
    {
      if(p)
    {
      this.cart_q=JSON.parse(p).length
    }
    else
    {
      this.cart_q=0;      
    }
  }
  else
  {
    let cus_id=JSON.parse(cus).id;
    this.http.get<Usercart[]>("http://localhost:3000/cart/?userid="+cus_id).subscribe((result:Usercart[])=>
    {
        this.cart_q=result.length;
    }
    )
  }
    
  }
  ngOnInit()
  {
   
    
  }
  submit_user_data(data:Signup)
  {
    return this.http.post("http://localhost:3000/user",data);
  }
  login_user(form:Login)
  {
    let url="http://localhost:3000/user?email="+form.email+"&&password="+form.password;
    return this.http.get<Login[]>(url);
  }
  get_product_id(id:number|undefined)
  {
    return this.http.get<Product>("http://localhost:3000/products/"+id);
  }
  cart_quantity()
  {
    let p=localStorage.getItem('cartdata');
    let cus=localStorage.getItem('customer');
    if(!cus)
    {
      if(p)
    {
      this.cart_q=JSON.parse(p).length
    }
    else
    {
     this.cart_q=0;
    }
  }
  else
  {
    let cus_id:number=JSON.parse(cus).id;
    this.http.get<Usercart[]>("http://localhost:3000/cart/?userid="+cus_id).subscribe((result:Usercart[])=>
    {
        this.cart_q=result.length;
    }
    )
  }
  }
  post_cart_product(cart:Usercart)
  {
    return this.http.post("http://localhost:3000/cart",cart);
  }
  get_cart_productid(u_id:number,id:number|undefined)
  {
    return this.http.get<Usercart[]>("http://localhost:3000/cart/?productid="+id+"&userid="+u_id);
  }
  product_exist(new_data:Usercart)
  {
    return this.http.put("http://localhost:3000/cart/"+new_data.id,new_data);
  }
  remove_product_productid(id:number|undefined)
  {
    return this.http.delete<Usercart[]>("http://localhost:3000/cart/"+id);
  
  }
  get_cart_user_product(cus_id:number,product_id:number)
  {
    return this.http.get<Usercart[]>("http://localhost:3000/cart/?userid="+cus_id+"&productid="+product_id);
  }
  get_cart_userid(id:number)
  {
    return this.http.get<Usercart[]>("http://localhost:3000/cart/?userid="+id);
  }
  get_cart_id(id:number)
  {
    return this.http.get<Usercart>("http://localhost:3000/cart/"+id);
  }
  update_quantity_product(result:Product)
  {
    return this.http.put<Product>("http://localhost:3000/products/"+result.id,result);
  }
  
}
