import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/entities/auth';
import { UsersServerService } from 'src/services/users-server.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CanDeactivateComponent } from 'src/guards/can-deactivate.guard';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, CanDeactivateComponent {
 auth = new Auth();
 sendToServer = false;

  constructor(
    private usersServerService: UsersServerService,
    private router: Router) { }

  ngOnInit() {
  }

  get vypisAuth():string {
    return JSON.stringify(this.auth);
   }

   setAuthName(event:any) {
    this.auth.name = event.target.value;
   }

   setAuthPass(event:any) {
    this.auth.password = event.target.value;
   }

   onSubmit(){
    this.sendToServer = true;
    this.usersServerService
    .login(this.auth)
    .subscribe(ok =>{  //1. parameter odchytava data
          if(this.usersServerService.redirectAfterLogin){
            this.router.navigateByUrl(this.usersServerService.redirectAfterLogin);
            this.usersServerService.redirectAfterLogin = null;
          } else{
            this.router.navigateByUrl("/");
          }
        } 
    );
   }

   canDeactivate(): boolean | Observable<boolean>  {
    if(this.sendToServer){
      return true;
    }

    const canLeave = !(this.auth.name || this.auth.password);
    if (canLeave) return true;
   
    // toto je ked vyplnam formular .. ale medzitym niekde inde kliknem
    const confirmation = window.confirm(
    'Are you sure to leave? The form is partially filled and will be discarded.');
    return of (confirmation);
    }

   
}
