import { Component, OnInit } from '@angular/core';
import { User } from 'src/entities/user';
import { UsersServerService } from 'src/services/users-server.service';

@Component({
  selector: 'app-extended-users',
  templateUrl: './extended-users.component.html',
  styleUrls: ['./extended-users.component.css']
})
export class ExtendedUsersComponent implements OnInit {

  users: Array<User> = [];
  constructor(private usersServerService: UsersServerService) {}

  ngOnInit() {
    this.usersServerService
    .getExtendedUsers()
    .subscribe(
      users => (this.users= users)
    )
  }

}
