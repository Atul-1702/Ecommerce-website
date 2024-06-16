import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Service/service.service';
import {Login, Signup} from '../data_type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  flag:boolean=true;
  status:boolean=true;
  constructor(public Service:ServiceService) { 
    
  }

  ngOnInit(): void {
    this.Service.reload();
  }
  sign_up(data:Signup){
    this.Service.data_add(data);
   
  }
  login_seller(data:Login)
  {
    this.Service.login_service(data);
  }
  form_change()
  {
    this.flag=!this.flag;
  }
}
