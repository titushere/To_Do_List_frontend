import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fromGroup!:FormGroup;
  user:User={};
    
  ngOnInit(): void {
   
      
  }
  constructor(private ser:UserServiceService,private forms:FormBuilder,private toastr: ToastrService){

  
  }


loginProcess(){
  if(this.user?.userEmail&&this.user.userPassword){
    this.ser.login(this.user).subscribe({
      next:data=>{
      if(data.success=="1"){
        console.log(data);
        this.toastr.success("login Successful.Redirecting complete","Logged In");
        localStorage.setItem('token',data.token);
        this.ser.isLoggedIn=true;
        this.ser.navigateToAllTask();
      }
     
    },
    error: err => {
      this.toastr.error("Login Failed,Please try later!")
     }
    });
  
  
  
  
  }
}




}
