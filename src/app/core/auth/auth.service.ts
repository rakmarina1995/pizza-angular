import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class AuthService {
public isLogged$:Subject<boolean>=new Subject<boolean>();

  constructor() { }
  private isLogged=false;
  getToken(){
    return 'test';
  }
  logIn(){
    this.isLogged=true;
    this.isLogged$.next(this.isLogged);
  }
  logOut(){
    this.isLogged=false;
    this.isLogged$.next(this.isLogged);
  }
  isLoggedIn():boolean{
    return this.isLogged;
  }

}
