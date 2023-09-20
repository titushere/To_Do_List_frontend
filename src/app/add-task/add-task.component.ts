import { Component } from '@angular/core';
import { Todo } from '../models/Todo';

import { UserServiceService } from '../services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { canexit } from '../services/can-deactivate.guard';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements canexit{
  formdata:Todo={}
  minDate = new Date();

  constructor(private ser:UserServiceService,private snackbar:MatSnackBar,private dig:MatDialog){}

///deactivated guard
submitStatus:boolean=false;
canDeactivate() {
  if (!this.submitStatus)
      this.submitStatus = confirm("You have not submitted a request to this Order. Any details entered will be lost. Are you sure you want to leave?");
  return this.submitStatus;
}


checkbeforeexit() {
  if ((this.formdata.taskName || this.formdata.priority || this.formdata.dueDate || this.formdata.category || this.formdata.taskDesc)!=null){
    if(confirm("Do you want to exit and continue")){
      this.dig.closeAll();
    } 
    return true;
  }
  else{
    this.dig.closeAll();
    return true;
  }
}
navmethod(){
this.dig.closeAll();
console.log("inside inner method");
// this.ser.navigateToDashView();
// this.dig.afterAllClosed.subscribe(data=>this.ser.navigateToAllTask());
}

makeRequest(){
    if (this.formdata.taskName && this.formdata.priority && this.formdata.dueDate && this.formdata.category &&this.formdata.taskDesc){
        this.formdata.status="pending";
        this.formdata.createdDate=new Date();
        this.formdata.currentDate=new Date();
        this.formdata.dueDate
        
        this.formdata.taskid=Math.random().toString(36).substring(2,7);
        console.log(this.formdata);
        console.log(this.formdata.taskid);
        // 
        this.ser.saveTask(this.formdata).subscribe({
        next: data => {
            this.snackbar.open("TodO Note Saved Re-add for more...","", {
            duration:3000
            });
            this.submitStatus=true;
            
            this.navmethod();
        },
        error:err => {
            
            alert("Error in saving note pls try later");
        }
        });
    }
   
    }





}
