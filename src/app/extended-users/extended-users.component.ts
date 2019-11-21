import { Component, OnInit } from '@angular/core';
import { User } from 'src/entities/user';
import { UsersServerService } from 'src/services/users-server.service';

declare var $:any;

@Component({
  selector: 'app-extended-users',
  templateUrl: './extended-users.component.html',
  styleUrls: ['./extended-users.component.css']
})
export class ExtendedUsersComponent implements OnInit {

  users: Array<User> = [];
  editedUser:User = new User('','');
  constructor(private usersServerService: UsersServerService) {}
  deleted: User = null;


  ngOnInit() {
    this.usersServerService
    .getExtendedUsers()
    .subscribe(
      users => this.users= users
    )
  }

  editUser(user: User){
    this.editedUser = User.clone(user);
    $('#userEditModal').modal('show'); 
  }

  addUser(user: User){
    this.editedUser = new User('','');
    $('#userEditModal').modal('show'); 
  }

  deleteUser(user: User){
    this.deleted = user;
    const originalId = user.id;
    this.usersServerService.deleteUser(user).subscribe(() => {
        this.users = this.users.filter(el => el.id !== originalId);
    });
    console.log("mal by si odstranit ho");
    // window.location.reload();
 
  } 
  //na vstepu je nic ... v subscribe (() => )
  // filter vracia nove pole ... nemodifikuje stareeeeeeeee


  onEvent(user:User) {
    const originalId= user.id;
    this.usersServerService.saveUser(user).subscribe(u => {
      if (originalId) { //update
        this.users[this.users.findIndex(el => el.id === originalId)] = u;
      } else { //insert
        this.users.push(u);
      }
     
    });
    
  }


   

}
