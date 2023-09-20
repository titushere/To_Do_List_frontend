import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Todo } from '../models/Todo';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { EditappComponent } from '../editapp/editapp.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-task',
  templateUrl: './all-task.component.html',
  styleUrls: ['./all-task.component.css']
})
export class AllTaskComponent implements OnInit {
  notes:Todo[]=[];
  filteredNotes:Todo[]=[];
  Status:string='pending';

  arr:Todo[]=[];
 
  viewMode: string | undefined;

  constructor(private ser:UserServiceService, private http:HttpClient,private dialog:MatDialog,private toastr: ToastrService){
    dialog.afterAllClosed
    .subscribe(() => {
    // update a variable or call a function when the dialog closes
      this.viewMode = 'loadingPage';
      this.getNotes();
    }
  );
  }

  ngOnInit(): void {
  //  this.Status="pending";
    console.log("reload complete");
    this.getNotes();
   }


  onClickFunction(){this.dialog.open(AddTaskComponent); }
  newComponentOpener(){this.dialog.open(EditappComponent);}


// subscibe to service and get data and put in empty notes array declared above to create a array of data.
  getNotes() {
    this.ser.getTask().subscribe(
      (data:any) => {
        this.notes = data;
        this.filteredNotes=this.notes.filter((note:any) =>note.status.toLowerCase().includes(this.Status.toLowerCase()));
        this.notes=this.filteredNotes;
      }
    );

 
  }
 


//filter based on search text ,captures event emitted from search component 
   onSearchTextChanged(searchText: string){
    if (searchText.trim()!==''){
      console.log(searchText);
      this.filteredNotes = this.notes.filter((note:any) =>note.taskName.toLowerCase().includes(searchText.toLowerCase()));
    } else {
      this.filteredNotes = this.notes;
    }
  }

  delete(id:String){
    return null;
  }

//card filteration based on cakes/chocolates or so...
  searchInput:string='';
  onfilter(){
    console.log(this.searchInput);
  this.filteredNotes=this.notes.filter((note:any) =>note.category.toLowerCase().includes(this.searchInput.toLowerCase()));
  }
  minDate=new Date();
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
