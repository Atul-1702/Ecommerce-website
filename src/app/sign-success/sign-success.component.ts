import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SellerAddProductService } from '../Service/seller-add-product.service';
import { Product } from '../data_type';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sign-success',
  templateUrl: './sign-success.component.html',
  styleUrls: ['./sign-success.component.css']
})
export class SignSuccessComponent implements OnInit {
  icon=faTrash;
  productList:Product[]=[];
  del_msg:String|undefined;
  edit_icon=faEdit
 
  constructor(private Service:SellerAddProductService) {
      this.helper(); 
   }

  ngOnInit(): void {
   
  }
  Delete_product(id:number)
  {

    this.Service.delete_product(id).subscribe((result:Product)=>
    {
      if(result)
      {
        this.del_msg="Item is deleted Successfully";
        this.helper();
        setTimeout(()=>this.del_msg=undefined,5000);
      }
    }
    )
  }
  helper()
  {
    this.Service.get_product().subscribe((result:Product[])=>
    {
      if(result)
      {
       this.productList=result
      }
    }
    )
  } 
}
