import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve, Router } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { Group } from 'src/entities/group';
import { UsersServerService } from 'src/services/users-server.service';
import { isEmpty, mergeMap, defaultIfEmpty } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupDetailResolverServiceGuard implements Resolve<Group> {

constructor(private userServerService: UsersServerService, private router: Router){}

  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot):  Observable<Group>  {
      return this.userServerService.getGroup(+route.paramMap.get('id'))
      .pipe(defaultIfEmpty(null))
      .pipe(mergeMap(group => {
        if(group){
          return of (group);
        } else{
          this.router.navigateByUrl('/groups/home');
          return EMPTY;
        }
      }));
  }
  
}
