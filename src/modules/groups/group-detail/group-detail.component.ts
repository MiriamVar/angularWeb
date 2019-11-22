import { Component, OnInit } from '@angular/core';
import { Group } from 'src/entities/group';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UsersServerService } from 'src/services/users-server.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  group: Group;

  constructor(private route: ActivatedRoute, private userServerService: UsersServerService) { }

  ngOnInit() {
   this.route.data.subscribe(data => {
      this.group = data.group
      console.log(data.group);
    });

    // const id = this.route.snapshot.params["id"];
    // this.userServerService.getGroup(id).subscribe(group => this.group = group);
    // this.route.paramMap.pipe(
    //   switchMap((params:ParamMap) => 
    //   this.userServerService.getGroup(+params.get('id'))))
    //   .subscribe(group => this.group = group);
}


}
