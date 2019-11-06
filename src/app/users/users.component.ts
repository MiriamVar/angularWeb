import { Component, OnInit } from '@angular/core';
import { User } from '../../entities/user';
import { UsersServerService } from 'src/services/users-server.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  title = 'Zoznam používateľov';
  users = [];
  selectedUser: User = null;
  //users$: Observable<Array<User>>;

  constructor(private usersServerService: UsersServerService) {}

  ngOnInit() {
    this.updateUsers();
    //this.users$ = this.usersServerService.getUsers();
  }

  updateUsers() {
    this.usersServerService.getUsers().subscribe(
      (u: Array<User>) => (this.users = u), //1.parameter odchytava data
    );
  }

  selectUser(user: User): void {
    this.selectedUser = user;
  }
}
