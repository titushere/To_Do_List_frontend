import { Component } from '@angular/core';
import { UserServiceService } from './services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TodoApp';
  constructor(private ser:UserServiceService){}
  

  // logoutf(){
  //   localStorage.removeItem('token');
  //   this.ser.isLoggedIn=false;
  //   this.ser.navigateToLoginView();
  // }
}
