import { Injectable } from '@angular/core';
import { User } from 'src/entities/user';
import { Observable, of, throwError, Subscriber, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Auth } from 'src/entities/auth';
import { MessageService } from './message.service';
import { Group } from 'src/entities/group';

@Injectable({
  providedIn: 'root'
})
export class UsersServerService {
  url = 'http://itsovy.sk:8080/';
  users = [];
  loggedUserSubscriber: Subscriber<string>;

  constructor(private http: HttpClient, private messageService: MessageService) {}

  get token(): string{
    return localStorage.getItem('token');
  }
  set token(value : string){
    if(value === null){
      localStorage.removeItem('token');
    }else{
      localStorage.setItem('token', value);
    }
    
  }

  get user(): string{
    return localStorage.getItem('user');
  }
  set user(value : string){
    if(value === null){
      localStorage.removeItem('user')
    } else {
      localStorage.setItem('user', value);
    }
  }

  getLoggedUser():Observable<string> //lebo po logovani sa nam vrati iba token
  { return new Observable<string>( subscriber => {
    this.loggedUserSubscriber = subscriber;
    subscriber.next(this.user)
  });
  }

  getUsers(): Observable<Array<User>> {
    return this.http
      .get(this.url + 'users')
      .pipe(map(jsonObj => this.fromJsonToListUsers(jsonObj)),
      catchError(error => this.httpErrorProcess(error))
      );
  }

  getExtendedUsers(): Observable<Array<User>> {
    return this.http
      .get(this.url + 'users/'+ this.token)
      .pipe(map(jsonObj => this.fromJsonToListUsers(jsonObj)),
      catchError(error => this.httpErrorProcess(error))
      );
  }

  private fromJsonToListUsers(jsonObject: any): Array<User> {
    const users: Array<User> = [];
    for (const user of jsonObject) {
      if(user.groups){
        users.push(
          new User(
            user.name, 
            user.email, 
            user.id,
            new Date(user.lastLogin),
            user.password,
            user.active,
            user.groups
            ));
      } else{
      users.push(new User(user.name, user.email, user.id));
      }
    }
    return users;
  }


  getGroups(): Observable<Array<Group>>{
    return this.http
    .get<Group[]>(this.url + 'groups')
    .pipe(
    catchError(error => this.httpErrorProcess(error))
    );
  }

  login(auth: Auth): Observable<boolean>{
   return this.http.post(this.url + 'login', auth, {responseType: "text"})
    .pipe(map(token => {  //map spracuje iba data
      this.token = token;     //getter setter uz je ako instancna premmena
      this.user = auth.name;
      this.loggedUserSubscriber.next(this.user);
      return true;
    }),
    catchError(error => this.httpErrorProcess(error))
    );
  }

  logout(){
    this.token = null;    
    this.user = null;
    this.loggedUserSubscriber.next(null);
  }

  httpErrorProcess(error){
    if(error instanceof HttpErrorResponse ){
        this.httpErrorToMessage(error);
        return EMPTY;
      }else{ 
        throwError(error); // nejaká iná chyba
      }

    
  }

  httpErrorToMessage(error: HttpErrorResponse){
    if (error.status === 0) {
      this.messageService.sendMessage('Server je nedostupny');
      return;
    }
    if(error.status >= 400 && error.status <500){
      if(error.error.errorMessage){
        this.messageService.sendMessage(error.error.errorMessage)
      }else{
        this.messageService.sendMessage(
          JSON.parse(error.error).errorMessage
        );
      }
      return;
    }
    this.messageService.sendMessage(
      error.message
    );
  }
}
