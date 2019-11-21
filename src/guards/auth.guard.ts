import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersServerService } from 'src/services/users-server.service';

@Injectable({
  providedIn: 'root'
})

// guard je vzdy na jedno pouzitie
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userServerService: UsersServerService
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("AuthGuard sa spustil");
      if(this.userServerService.token){
        return true;
      } else{
          this.userServerService.redirectAfterLogin = state.url;
          this.router.navigateByUrl('/login');
      }
     
    return true;
  }
  
}
