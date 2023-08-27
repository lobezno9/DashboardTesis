import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError, Subject } from 'rxjs';
import { Dictionary } from '../shared/classes/dictionary';
import { serializationUtils } from '../shared/classes/serializationUtils';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected _baseUrl: string;
  public _http: HttpClient;
  protected _onUnauthorizedRequest: EventEmitter<any>;
  //   public _router: Router;

  constructor(protected http: HttpClient, protected router: Router) {
    this._http = http;
    this._baseUrl = environment.ApiUrl;
    this._onUnauthorizedRequest = new EventEmitter<any>();
  }
  //Funcion que crea una poticion post 
  executePost(relativeUrl: string, data?: any): any {
    const url = `${this._baseUrl + relativeUrl}`;
    //console.log(data,'Logs')
    return this.http.post(url, data, this.headers).pipe(
      catchError(error => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {

          errorMsg = this.getServerErrorMessage(error);
        }

        return throwError(errorMsg);
      })
    );
  }
  //Parametro que obtiene el token desde el local Storage
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  //Parametro que obtiene los headers para la peticion post
  get headers() {
    return {
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    }
  }
  //Funcion que devuelve el tipo de error que devuelve la peticion
  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }

    }
  }
}
