import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { GetWarehouseIn } from '../shared/methodparameters/Warehouse/GetWarehouseIn';
import { GetWarehouseOut } from '../shared/methodparameters/Warehouse/GetWarehouseOut';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  private _proxy: BaseService;

  public get proxy(): BaseService {
    return this._proxy;
  }

  constructor(http: HttpClient, protected router: Router) {
    this._proxy = new BaseService(http, router);
  }
  //Funcion que ejetucta una funcion post para traer una lista de Warehouse
  GetAll(getWarehouseIn: GetWarehouseIn): Observable<GetWarehouseOut> {
    return this._proxy.executePost('Warehouse/GetAll', getWarehouseIn)
  };

  private subject = new Subject<any>();
  ExecuteShareEvent() {
    this.subject.next();
  }

  GetExecuteShareEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}