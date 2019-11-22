import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { ExtendedUsersComponent } from './extended-users/extended-users.component';
import { MessageComponent } from './message/message.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { GroupsModule } from 'src/modules/groups/groups.module';

@NgModule({
  declarations: [AppComponent, UsersComponent, LoginComponent, PageNotFoundComponent, NavbarComponent, ExtendedUsersComponent, MessageComponent, UserEditComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule, AngularFontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
