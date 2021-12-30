import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:any=FormGroup
  constructor(private _date:ApiService,private router:Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'Gmail': new  FormControl ('',[Validators.required,Validators.email]),
      'password': new FormControl ('',[Validators.required,Validators.minLength(8),Validators.maxLength(12),Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$")])
    })
  }


  onRegister(){
    let obj:any = {
      Gmail:this.registerForm.get('Gmail').value,
      password:this.registerForm.get('password').value
    }
     
     

    this._date.postData(obj).subscribe((res:any)=>{
      console.log(res);
      alert("signUp is SuccessFull")
      this.registerForm.reset();
this.router.navigate(["login"])
    
      
    })
    

   

  }
}
