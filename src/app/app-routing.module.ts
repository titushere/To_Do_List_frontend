import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { AllTaskComponent } from './all-task/all-task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { canDeactivateGuard } from './services/can-deactivate.guard';
import { EditappComponent } from './editapp/editapp.component';
import { HighPriorityComponent } from './high-priority/high-priority.component';
import { TodaysComponent } from './todays/todays.component';
import { ArchiveComponent } from './archive/archive.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes=[
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent,},
  {path:"add-task",component:AddTaskComponent,canDeactivate:[canDeactivateGuard]},
  {path:"main",component:AllTaskComponent,canActivate:[AuthGuard]},
  {path:"edit/:id",component: EditappComponent,canActivate: [AuthGuard]},
  {path:"high",component:HighPriorityComponent,canActivate: [AuthGuard]},
  {path:"today",component:TodaysComponent,canActivate: [AuthGuard]},
  {path:"archive",component:ArchiveComponent,canActivate:[AuthGuard]},
 {path:'', redirectTo:"register",pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
