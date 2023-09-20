import { Component, booleanAttribute } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Todo } from '../models/Todo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent {
  notes:Todo[]=[];
  filteredNotes:Todo[]=[];
  viewMode: string | undefined;
  searchInput:string='';
  Status:string='completed';

  constructor(private ser:UserServiceService, private http:HttpClient,private dialog:MatDialog,private toastr:ToastrService){}
  ngOnInit(): void {
    this.getNotes();
   }
// subscibe to service and get data and put in empty notes array declared above to create a array of data.
getNotes() {
  console.log("inside get notes")
  this.ser.getTask().subscribe(
    (data:any) => {
      this.notes = data;
      this.filteredNotes=this.notes.filter((note:any) =>note.status.toLowerCase().includes(this.Status.toLowerCase()));
      
    }
  );
}

minDate=new Date();
  obj: Todo = {taskid:'', taskName:'', priority:'',category:'',taskDesc:'',dueDate:this.minDate};

  setStatus(id:string){ 
    if(confirm("Are you Sure you want to UN-Archive?")){

      this.ser.getNote(id).subscribe((data:any) => {
        this.obj = data;
        
        this.obj.status="pending";
        console.log(this.obj);
    
        this.ser.updateTask(this.obj).subscribe({
          next: exp => {
            this.toastr.success("Task Un-Archive completed","UNARCHIVED");
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
  state:Boolean | undefined;

deleteThis(id:string){
  this.state=confirm("Are you Sure you want to Delete? TASK will be deleted forever");
  if(this.state){
      this.ser.deleteNote(id).subscribe({
        next: exp => {
          this.toastr.success("Task Deleted completed","Delete Complete");
          this.getNotes();
          },
        error:err => {
            this.toastr.success("Task Deletion UnSuccessful");
            this.getNotes(); 
        }

        });
  } 


 
}

logoutf(){
  localStorage.removeItem('token');
  this.ser.isLoggedIn=false;
  this.ser.navigateToLoginView();
}

}


