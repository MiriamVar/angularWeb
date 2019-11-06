import { Component, OnInit } from '@angular/core';
import { User } from 'src/entities/user';
import { Group } from 'src/entities/group';
import { UsersServerService } from 'src/services/users-server.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
private user = new User('','');
private groups: Map<Group, boolean> = new Map<Group, boolean>();

  constructor(private userServerService: UsersServerService) { }

  ngOnInit() {
    this.userServerService
    .getGroups()
    .subscribe(groups => {
      groups.forEach(group =>{
      this.user.groups.includes(group) ? this.groups.set(group,true) : this.groups.set(group,false);
      })
    });
  }

  toggleGroup(event: any, group: Group){
    const checked = event.target.checked;
    this.groups.set(group,event.target.checked);
    if(checked){
      this.user.groups = [...this.user.groups,group];
    } else{
      this.user.groups = this.user.groups.filter(el => el.id !== group.id);
    }
  }

  showUser(){
    return JSON.stringify(this.user);
  }
}
