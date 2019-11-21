import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups/groups.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { GroupHomeComponent } from './group-home/group-home.component';
import { GroupMenuComponent } from './group-menu/group-menu.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [GroupsComponent, GroupDetailComponent, GroupEditComponent, GroupHomeComponent, GroupMenuComponent],
  imports: [
    AngularFontAwesomeModule,
    CommonModule,
    FormsModule,
    GroupsRoutingModule
  ]
})
export class GroupsModule { }
