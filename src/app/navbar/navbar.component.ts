import { Component, OnInit } from '@angular/core';
import { UsersServerService } from 'src/services/users-server.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
loggedUser= null;

  constructor(private usersServerService: UsersServerService) { }

  ngOnInit() {
    this.usersServerService
    .getLoggedUser()
    .subscribe(user => (this.loggedUser = user));
  }

  logout(){
    this.usersServerService.logout();
  }
}
