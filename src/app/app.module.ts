import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from  '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AllTaskComponent } from './all-task/all-task.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { CustomInterceptor } from './custom.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { EditappComponent } from './editapp/editapp.component';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HighPriorityComponent } from './high-priority/high-priority.component';
import { TodaysComponent } from './todays/todays.component';
import { ArchiveComponent } from './archive/archive.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { RegisterComponent } from './register/register.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';


@NgModule({
  declarations: [
    AppComponent,

    AddTaskComponent,
    AllTaskComponent,
    LoginComponent,
    SearchComponent,
    EditappComponent,
    HighPriorityComponent,
    TodaysComponent,
    ArchiveComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
    MatButtonToggleModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatListModule,
    MatSidenavModule,
    MatTooltipModule,
    MatExpansionModule,
    MatBadgeModule
    
  ],
  providers: [ {
    provide:HTTP_INTERCEPTORS,useClass:CustomInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
 
