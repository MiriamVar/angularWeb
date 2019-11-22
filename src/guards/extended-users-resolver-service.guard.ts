import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { User } from 'src/entities/user';
import { UsersServerService } from 'src/services/users-server.service';
import { defaultIfEmpty, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExtendedUsersResolverServiceGuard implements Resolve<Array<User>> {

  constructor(private userServerService: UsersServerService, private router: Router){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<User[]>  {
    return this.userServerService.getExtendedUsers()
    .pipe(defaultIfEmpty(null))
    .pipe(mergeMap(users => {
      if(users){
        return of(users);
      } else{
        return EMPTY;
      }
    }));
  }

  
}
