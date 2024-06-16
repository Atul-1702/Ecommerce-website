import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { Signup,Login } from '../data_type';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  Status=new BehaviorSubject<boolean>(false);
  
  login_help:boolean=false;
  constructor(private http:HttpClient,private router:Router) { 
    if(localStorage.getItem('user'))
    {
      this.Status.next(true);
    }
    
    
    
  }
  ngOnInit()
  {
    
  }
  data_add(values:Signup)
  {
    this.http.post("http://localhost:3000/seller",values,{observe:'response'}).subscribe(
      (result)=>{
        this.Status.next(true);
        localStorage.setItem('user',JSON.stringify(result.body));
        this.router.navigate(["seller-sign-success"]);
       
      }
    );
  }
  reload()
  {
    if(localStorage.getItem('user'))
    {
      this.Status.next(true);
      this.router.navigate(["seller-sign-success"]);
    }
    else
    {
      this.Status.next(false);
    }
  }
  login_service(values:Login)
  {
     let url="http://localhost:3000/seller?email="+values.email+"&password="+values.password;
     this.http.get(url).subscribe((result:any)=>
     {
       
        if(result.length!=0)
        {
        this.Status.next(true);
        this.router.navigate(["seller-sign-success"]);
        localStorage.setItem('user',JSON.stringify(result));
        this.login_help=false;
        
      }
      else
      {
        this.login_help=true;
        this.Status.next(false);
      }
     }
     );
  }
}
