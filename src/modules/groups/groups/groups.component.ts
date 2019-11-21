import { Component, OnInit } from '@angular/core';
import { UsersServerService } from 'src/services/users-server.service';
import { Group } from 'src/entities/group';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: Group[];

  constructor(private userServerService: UsersServerService) { }

  ngOnInit() {
    this.userServerService.getGroups().subscribe(
      groups => {(this.groups = groups)}
    );
  }

}
