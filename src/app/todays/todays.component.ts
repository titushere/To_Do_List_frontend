import { Component } from '@angular/core';

import { UserServiceService } from '../services/user-service.service';
import { Todo } from '../models/Todo';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-todays',
  templateUrl: './todays.component.html',
  styleUrls: ['./todays.component.css']
})
export class TodaysComponent {

  notes:Todo[]=[];
  filteredNotes:Todo[]=[];
  minDate = new Date();

  viewMode: string | undefined;
  searchInput:string='';

  constructor(private ser:UserServiceService, private http:HttpClient,private dialog:MatDialog,private toastr: ToastrService){}

  public onValChange(val: string) {
    this.searchInput = val;
    this.onfilter();
  }
  

  ngOnInit(): void {
    console.log("reload complete");
    this.searchInput ='High';
    this.getNotes();
   }



// subscibe to service and get data and put in empty notes array declared above to create a array of data.
  getNotes() {
    this.ser.getTask().subscribe(
      (data:any) => {
        this.notes = data;
        const now = new Date();
        now.setHours(0,0,0,0);
 console.log(now);
        this.filteredNotes=this.notes.filter(item => now >= new Date(item.dueDate));
      }
    );
 console.log(this.filteredNotes.length);
  }


  onfilter(){
    console.log(this.searchInput);
    this.filteredNotes=this.notes.filter((note:any) =>note.priority.toLowerCase().includes(this.searchInput.toLowerCase()));
  }

 




  obj: Todo = {taskid:'', taskName:'', priority:'',category:'',taskDesc:'',dueDate:this.minDate};

  setStatus(id:string){ 
    if(confirm("Are you Sure you want to archive?")){

      this.ser.getNote(id).subscribe((data:any) => {
        this.obj = data;
        
        this.obj.status="completed";
        console.log(this.obj);
    
        this.ser.updateTask(this.obj).subscribe({
          next: exp => {
            this.toastr.success("Task Archive completed","Update Complete");
              this.getNotes();
        
          },
          error:err => {
              this.toastr.success("Error in archiving note pls try later");
            
          }
          });
      });

    } 
    else{
      this.dialog.closeAll();
      
    }
  
  
  }

  logoutf(){
    localStorage.removeItem('token');
    this.ser.isLoggedIn=false;
    this.ser.navigateToLoginView();
  }

}
