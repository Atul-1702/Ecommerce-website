export interface Signup
{
    name:String,
    password:String,
    email:String
}
export interface Login
{
    email:String,
    password:String,
    id:number,
}
export interface Product
{
    id:number,
    name:string,
    price:number,
    color:string,
    category:string,
    image:string,
    description:string,
    quantity:number|undefined,
}
export interface Usercart
{
    productid:number,
    name:string,
    price:number,
    color:string,
    category:string,
    image:string,
    description:string,
    userid:number,
    quantity:number|undefined,
    id:number|undefined,
}
export interface Summary
{
    price:number,
    tax:number,
    delivery:number,
    total:number,
    discount:number,
}