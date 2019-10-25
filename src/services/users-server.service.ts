import { Injectable } from '@angular/core';
import { User } from 'src/entities/user';
import { Observable, of, throwError, Subscriber } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Auth } from 'src/entities/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersServerService {
  url = 'http://itsovy.sk:8080/';
  users = [
    new User('JanoService', 'jano@jano.sk', 1),
    new User('MartinService', 'martin@jano.sk'),
    new User(
      'KlaudiaService',
      'klaudia@gmail.com',
      undefined,
      new Date('2019-10-04T11:30:00'),
      'somdoma'
    )
  ];
  loggedUserSubscriber: Subscriber<string>;

  constructor(private http: HttpClient) {}

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


  getLocalUsers(): Observable<Array<User>> {
    return of(this.users);
  }

  getUsers(): Observable<Array<User>> {
    return this.http
      .get(this.url + 'users')
      .pipe(map(jsonObj => this.fromJsonToListUsers(jsonObj)));
  }

  getExtendedUsers(): Observable<Array<User>> {
    return this.http
      .get(this.url + 'users/'+ this.token)
      .pipe(map(jsonObj => this.fromJsonToListUsers(jsonObj)));
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

  login(auth: Auth): Observable<boolean>{
   return this.http.post(this.url + 'login', auth, {responseType: "text"})
    .pipe(map(token => {  //map spracuje iba data
      this.token = token;     //getter setter uz je ako instancna premmena
      this.user = auth.name;
      this.loggedUserSubscriber.next(this.user);
      return true;
    }),
    catchError(error => { //catchError Observable metoda .. spracuvava len
      if(error instanceof HttpErrorResponse && error.status == 401){
      this.logout();
      return of(false); //zle heslo alebo meno  .... return of (false) - nema navratove data ale nejaky error
      }
    return throwError(error); // nejaká iná chyba
    })
    );
  }

  logout(){
    this.token = null;    
    this.user = null;
    this.loggedUserSubscriber.next(null);
  }
}
