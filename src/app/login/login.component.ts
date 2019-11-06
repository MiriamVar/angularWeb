import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/entities/auth';
import { UsersServerService } from 'src/services/users-server.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 auth = new Auth();

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
    this.usersServerService
    .login(this.auth)
    .subscribe(
      ok =>{  //1. parameter odchytava data
          this.router.navigateByUrl('/extended-users');
        } 
    );
   }

   
}
