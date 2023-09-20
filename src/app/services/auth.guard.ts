import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn:'root'
})

export class AuthGuard implements CanActivate {
  
  constructor(private ser:UserServiceService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.ser.isLoggedIn===false){
      this.ser.navigateToLoginView();
      return false;
    }
    else{
      return true;
    }

  }
 
}
