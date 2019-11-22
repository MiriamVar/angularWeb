import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { GroupHomeComponent } from './group-home/group-home.component';
import { GroupMenuComponent } from './group-menu/group-menu.component';
import { AuthGuard } from 'src/guards/auth.guard';
import { CanDeactivateGuard } from 'src/guards/can-deactivate.guard';
import { GroupDetailResolverServiceGuard } from 'src/guards/group-detail-resolver-service.guard';


const routes: Routes = [{
    component: GroupMenuComponent,
    children: [
      { path: 'home', component: GroupHomeComponent },
      { path: 'list', component: GroupsComponent },
      { path: 'detail/:id', component: GroupDetailComponent, resolve: {group: GroupDetailResolverServiceGuard} },
      { path: 'edit/:id', component: GroupEditComponent, canActivate:[AuthGuard], canDeactivate:[CanDeactivateGuard] }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
