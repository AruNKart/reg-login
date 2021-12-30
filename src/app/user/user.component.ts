import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  employeeForm:any= FormGroup;
  employeedata !:any
  constructor(private _api:ApiService) { }

  ngOnInit(): void {
    this.employeeForm= new FormGroup({
      "First_Name" : new FormControl("",Validators.required),
      "last_Name" : new FormControl("",Validators.required),
      "Email" : new FormControl("",[Validators.email,Validators.required]),
      "number" :new FormControl("",Validators.required),
      "salary" :new FormControl("",Validators.required)
    })
    this.getAllEmployees()
  }
  add(){
    let obj:any={
      firstName:this.employeeForm.get("First_Name").value,
      lastName:this.employeeForm.get("last_Name").value,
      Email:this.employeeForm.get("Email").value,
      number:this.employeeForm.get("number").value,
      salary:this.employeeForm.get("salary").value
    }
    
    this._api.postdata(obj).subscribe((res:any)=>{
      console.log(res);
      alert("Employee Add SuccessFully")
      //auto click to cancel-----------------------------------
      let ref = document.getElementById('cancel')
      ref?.click();
      //-------------
      this.employeeForm.reset();
      this.getAllEmployees();
      
    })
    
    }
    getAllEmployees(){
      this._api.getData().subscribe((res:any)=>{
        console.log(res)
        this.employeedata=res;
      })
    }
    
    deleteEmployee(value:any){
      this._api.delete(value.id).subscribe((res:any)=>{
        alert("Employee Deleted")
        this.getAllEmployees();
      })
    }
    onEdit(value:any){
      this.employeeForm.controls['First_Name'].setValue(value.First_Name)
      this.employeeForm.controls['last_Name'].setValue(value.last_Name)
      this.employeeForm.controls['Email'].setValue(value.Email)
      this.employeeForm.controls['number'].setValue(value.number)
      this.employeeForm.controls['salary'].setValue(value.salary)
    }
}
