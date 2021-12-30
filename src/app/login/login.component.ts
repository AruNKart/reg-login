import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:any=FormGroup

  constructor(private _get:ApiService,private route:Router) { }

  ngOnInit(): void {
    this.loginForm= new FormGroup({
      'Gmail': new FormControl ("",Validators.required),
      'password': new FormControl("",Validators.required)
    })
  }

  onLogin(){
    let obj:any={
      "Gmail":this.loginForm.get('Gmail').value,
      "password":this.loginForm.get('password').value
    }
    console.log(obj);
   this._get.getdata().subscribe((res:any)=>{
     console.log(res);
   const user = res.find((a:any)=>{
    return a.Gmail === this.loginForm.value.Gmail && a.password === this.loginForm.value.password
   })
     if(user){
       alert('login is success');
       this.route.navigate(['user'])
       this.loginForm.reset()
     }else{
        alert("oops!,user not found");
        this.route.navigate(['Register'])
     }
     
   },err=>{
     alert("something went wrong!!")
   })
    
  }


}
