import { Injectable } from '@angular/core';
import { Product } from '../data_type';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SellerAddProductService {

  constructor(private http:HttpClient) { }
  send_product(formdata:Product)
  {
    return this.http.post("http://localhost:3000/products",formdata);
  }
  get_product()
  {
    return this.http.get<Product[]>("http://localhost:3000/products")
  }
  delete_product(id:number)
  {
       return this.http.delete<Product>("http://localhost:3000/products/"+id);
  }
  get_product_id(id:string)
 {
   return this.http.get<Product>("http://localhost:3000/products/"+id);
 }
 change_product(id:number,values:Product)
 {
  return this.http.put("http://localhost:3000/products/"+id,values);
 }
 popular_products()
 {
  return this.http.get<Product[]>("http://localhost:3000/products?_limit=3");
 }
 trendy_products()
 {
  return this.http.get<Product[]>("http://localhost:3000/products?_limit=20");
 }
 fetch_product(value:string)
 {
  return this.http.get<Product[]>("http://localhost:3000/products?q="+value);
 }
}
