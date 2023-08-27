import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { BaseService } from './base.service';

import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginIn } from '../shared/methodparameters/Login/LoginIn';
import { LoginOut } from '../shared/methodparameters/Login/LoginOut';
import { ValidateRecoverPasswordIn } from '../shared/methodparameters/Login/ValidateRecoverPasswordIn';

@Injectable()
export class AuthService {
  private _proxy: BaseService;

  public get proxy(): BaseService {
    return this._proxy;
  }

  constructor(http: HttpClient, router: Router) {

    this._proxy = new BaseService(http, router);
  }
  //Funcion que ejetucta un servicio post para autenticar un usuario
  Login(login: LoginIn): Observable<LoginOut> {
    return this._proxy.executePost('Auth/Login', login)
  };
  //Funcion que ejetucta un servicio post para enviar objeto para recuperacion de contraseña
  RecoverPassword(recover: ValidateRecoverPasswordIn): Observable<any> {
    return this._proxy.executePost('Auth/ValidateRecoverPassword', recover)
  };

  // mapLoginResponse(info: any): LoginOut {
  //   let result = <LoginOut>info;
  //   return result;
  // }
}
