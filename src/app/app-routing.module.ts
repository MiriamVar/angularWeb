import { NgModule } from '@angular/core';
import { RouterModule ,Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ExtendedUsersComponent } from './extended-users/extended-users.component';
import { AuthGuard } from 'src/guards/auth.guard';
import { CanDeactivateGuard } from 'src/guards/can-deactivate.guard';
import { ExtendedUsersResolverServiceGuard } from 'src/guards/extended-users-resolver-service.guard';

const routes:Routes = [
  {path: 'groups', loadChildren: () => import('./../modules/groups/groups.module').then(mod => mod.GroupsModule), canLoad: [AuthGuard]},
  {path: 'users', component: UsersComponent},
  {path: 'extended-users', component: ExtendedUsersComponent, canActivate: [AuthGuard], resolve: [ExtendedUsersResolverServiceGuard]},
  {path: 'login', component: LoginComponent, canDeactivate: [CanDeactivateGuard]},
  {path: '', redirectTo: '/users', pathMatch: 'full' },
  {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
