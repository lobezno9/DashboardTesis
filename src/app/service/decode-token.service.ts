import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DecodeTokenService {

  constructor(
    private _proxy: BaseService
  ) { }

  // Funcion que recibe el token y decodifica devolviendo los Claims
  getDecodedAccessToken(): any {
    try {
      if (this._proxy.token !== '') {
        return jwt_decode(this._proxy.token);
      }
      return ''
    } catch (Error) {
      return Error;
    }
  }
}
