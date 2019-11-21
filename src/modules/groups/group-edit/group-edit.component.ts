import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersServerService } from 'src/services/users-server.service';
import { Group } from './../../../entities/group';
import { CanDeactivateGuard } from 'src/guards/can-deactivate.guard';
import { Observable, of } from 'rxjs';
import { MessageService } from 'src/services/message.service';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit, CanDeactivateGuard {

  group = new Group();
  permString: string;

  nameGroup: string;
  namePerm: string;

  buttonPressed = false;

   constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userServerService: UsersServerService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.userServerService.getGroup(id).subscribe(group => {
      this.group = group;
      this.permString = group.permissions.join(', ');

      this.nameGroup = group.name;
      this.namePerm = group.permissions.join(', ');
    });
  }

  onSubmit() {
    this.buttonPressed = true;
    this.userServerService.saveGroup(this.group).subscribe(group => {
      this.router.navigate(['/groups', 'list']);
      //      this.router.navigate(['../', 'list'], { relativeTo: this.route });
    });
  }

  onKeyUp(event: any) {
    this.group.permissions = event.target.value
      .split(',')
      .map(el => el.trim())
      .filter(el => el);
  }

  close() {
    this.router.navigate(['/groups', 'list']);
  }

  canDeactivate(): boolean | Observable<boolean>  {
    if(this.buttonPressed){
      return true;
    }

    if(this.group.name === this.nameGroup && this.namePerm === this.permString){
      return true;
    } else{
     this.messageService.sendMessage("taaa nemozes kamo");
    }

    }

}
