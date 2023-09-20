import { Component } from '@angular/core';
import { User } from '../models/User';
import { UserServiceService } from '../services/user-service.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user:User={};
  
  constructor(private ser:UserServiceService,private forms:FormBuilder,private toastr: ToastrService){}


  registerProcess(){
    if(this.user?.userEmail&&this.user.userPassword&&this.user?.userPhone&&this.user?.userName){
      this.ser.saveData(this.user).subscribe({
        next:data=>{
          console.log(data);
          this.toastr.success("Login to add task","Successfully Register");
          // localStorage.setItem('token',data.token);
          // this.ser.isLoggedIn=true;
          // this.ser.navigateToAllTask();

      },
      error: err => {
        this.toastr.error("Registeration Unsuccessful")
       }
      });
    }
  }





}
