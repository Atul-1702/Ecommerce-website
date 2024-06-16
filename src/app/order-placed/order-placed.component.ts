import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.css']
})
export class OrderPlacedComponent implements OnInit {

  router:Router=inject(Router)
  constructor() { }

  ngOnInit(): void {

    setTimeout(()=>{
        this.router.navigate(['/']);
    },3000);
  }

}
