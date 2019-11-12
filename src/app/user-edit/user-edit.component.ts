import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { User } from 'src/entities/user';
import { Group } from 'src/entities/group';
import { UsersServerService } from 'src/services/users-server.service';

declare var $:any; 

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnChanges {

@Input() public  user: User;
private groups: Map<Group, boolean> = new Map<Group, boolean>();
@Output() eventPipe = new EventEmitter<User>();
@Input() public actionWithUser: string;

  constructor(private userServerService: UsersServerService) { }

  ngOnChanges(){
    this.userServerService
    .getGroups()
    .subscribe(groups => {
      this.groups.clear();
      groups.forEach(group =>{
      this.user.groups.find(el => el.id === group.id) 
      ? this.groups.set(group,true) 
      : this.groups.set(group,false);
      })
    });
  }

  ngOnInit() {
   
  }

  toggleGroup(event: any, group: Group){
    const checked = event.target.checked;
    this.groups.set(group, checked); 
    if(checked){
      this.user.groups = [...this.user.groups,group];
    } else{
      this.user.groups = this.user.groups.filter(el => el.id !== group.id);
    }
  }

  showUser(){
    return JSON.stringify(this.user);
  }

  onSubmit(){
    this.eventPipe.emit(this.user);
    $('#userEditModal').modal('hide'); 
  }
}
