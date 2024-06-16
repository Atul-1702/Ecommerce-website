import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentMethod:string='card';
  route:ActivatedRoute=inject(ActivatedRoute);
  amount:number=0;
  router:Router=inject(Router);
  constructor() { }

  ngOnInit(): void {
   
     this.route.queryParamMap.subscribe((query)=>
    {
      this.amount=Number(query.get('amount'));
    }
    )
  }
  
  selectOption(method:string)
  {
    this.paymentMethod=method;
  }
  orderPlaced()
  {
     this.router.navigate(['/order-placed']);
  }
}
