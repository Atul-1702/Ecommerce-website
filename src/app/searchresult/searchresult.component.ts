import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SellerAddProductService } from '../Service/seller-add-product.service';
import { Product } from '../data_type';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent implements OnInit {
  get_query:string|null=null;
  product:Product[]|undefined;
  constructor(private data:ActivatedRoute,private service:SellerAddProductService) {
   
   }
  ngOnInit(): void {
    this.get_query=this.data.snapshot.paramMap.get('query');
    this.get_query&&this.service.fetch_product(this.get_query).subscribe((result)=>
    {
      this.product=result;
    })
    
  }

}
