import { Component } from '@angular/core';
import { Todo } from '../models/Todo';
import { UserServiceService } from '../services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editapp',
  templateUrl: './editapp.component.html',
  styleUrls: ['./editapp.component.css']
})
export class EditappComponent {
  // formdata:Todo={};
  minDate = new Date();
  formdata: Todo = {taskid:'', taskName:'', priority: '',category:'',taskDesc:'',dueDate:this.minDate};
  constructor(private ser:UserServiceService,private snackbar:MatSnackBar,private dig:MatDialog,private activatedRoute:ActivatedRoute,private toastr: ToastrService ){}
  
  checkbeforeexit() {
    if ((this.formdata.taskName || this.formdata.priority || this.formdata.dueDate || this.formdata.category || this.formdata.taskDesc)!=null){
      if(confirm("Do you want to exit upadting card. All Progress will be Lost!")){
        this.ser.navigateToAllTask();
      } 
      return true;
    }
    else{
      this.dig.closeAll();
      return true;
    }
  }
 

  ngOnInit(): void {
    console.log("esit log");
    this.activatedRoute.paramMap.subscribe((params) => {
      let taskid=params.get("id")??'0';
      console.log(taskid);
      this.ser.getNote(taskid).subscribe((data:any) => {
        this.formdata = data;
      });
    });
  }

update(){
if (this.formdata.taskName && this.formdata.priority && this.formdata.dueDate && this.formdata.category &&this.formdata.taskDesc){
      this.formdata.status="pending";
      this.formdata.currentDate=new Date();
      
    this.ser.updateTask(this.formdata).subscribe({
      next: data => {
        this.ser.navigateToAllTask();
        this.toastr.success("Task update  completed","UPDATED");
      },
      error:err => {
          
        this.toastr.error("Task could not be saved","Update Failed");
      }
      })
  }


  

}


logoutf(){
  localStorage.removeItem('token');
  this.ser.isLoggedIn=false;
  this.ser.navigateToLoginView();
}









  
  
  // makeRequest() {
  //     if (this.formdata.taskName && this.formdata.priority && this.formdata.dueDate && this.formdata.category &&this.formdata.taskDesc){
  //         this.formdata.Status="pending";
  //         this.formdata.createdDate=new Date();
  //         this.formdata.currentDate=new Date();
  //         this.formdata.taskid=Math.random().toString(36).substring(2,7);
  //         console.log(this.formdata);
  //         console.log(this.formdata.taskid);
  //         // 
  //         this.ser.saveTask(this.formdata).subscribe({
  //         next: data => {
  //             this.snackbar.open("TodO Note Saved Re-add for more...","", {
  //             duration:3000
  //             });
  //             // this.submitStatus=true;
  //             this.dig.closeAll();
  //         },
  //         error:err => {
              
  //             alert("Error in saving note pls try later");
  //         }
  //         });
  //     }
  //     }
}
