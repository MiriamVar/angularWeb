import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersServerService } from 'src/services/users-server.service';

@Injectable({
  providedIn: 'root'
})

// guard je vzdy na jedno pouzitie
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private userServerService: UsersServerService
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("AuthGuard sa spustil");
      return this.canAnything(state.url);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean{
    return this.canAnything(route.path);
  }

  canAnything(url: string){
    console.log("AuthGuard sa spustil");
      if(this.userServerService.token){
        return true;
      } else{
          this.userServerService.redirectAfterLogin =url;
          this.router.navigateByUrl('/login');
      }
     
    return true;
  }
  
}
