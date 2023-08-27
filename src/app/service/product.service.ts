import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { GetProductIn } from '../shared/methodparameters/Product/GetProductIn';
import { GetProductOut } from '../shared/methodparameters/Product/GetProductOut';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _proxy: BaseService;

  public get proxy(): BaseService {
    return this._proxy;
  }

  constructor(http: HttpClient, protected router: Router) {
    this._proxy = new BaseService(http, router);
  }
    //Funcion que ejetucta un servicio post para traer una lista de Product
    GetAll(getProductIn: GetProductIn): Observable<GetProductOut> {
    return this._proxy.executePost('Product/GetAll', getProductIn)
  };

  private subject = new Subject<any>();
  ExecuteShareEvent() {
    this.subject.next();
  }

  GetExecuteShareEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
