import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AddCountInventoryIn } from '../shared/methodparameters/CountInventory/AddCountInventoryIn';
import { AddCountInventoryOut } from '../shared/methodparameters/CountInventory/AddCountInventoryOut';
import { GetCountInventoryIn } from '../shared/methodparameters/CountInventory/GetCountInventoryIn';
import { GetCountInventoryOut } from '../shared/methodparameters/CountInventory/GetCountInventoryOut';
import { UpdateCountInventoryIn } from '../shared/methodparameters/CountInventory/UpdateCountInventoryIn';
import { UpdateCountInventoryOut } from '../shared/methodparameters/CountInventory/UpdateCountInventoryOut';
import { BaseService } from './base.service';
import { GetResportCountInventoryIn } from '../shared/methodparameters/CountInventory/GetResportCountInventoryIn';
import { GetResportCountInventoryOut } from '../shared/methodparameters/CountInventory/GetResportCountInventoryOut';
import { AddCountsProductsIn } from '../shared/methodparameters/CountInventory/AddCountsProductsIn';
import { AddCountsProductsOut } from '../shared/methodparameters/CountInventory/AddCountsProductsOut';

@Injectable({
  providedIn: 'root'
})
export class CountInventoryService {

  private _proxy: BaseService;

  public get proxy(): BaseService {
    return this._proxy;
  }

  constructor(http: HttpClient, protected router: Router) {
    this._proxy = new BaseService(http, router);
  }
  //Funcion que ejetucta un servicio post para traer una lista de CountInventory
  GetAll(getCountInventoryIn: GetCountInventoryIn): Observable<GetCountInventoryOut> {
    return this._proxy.executePost('CountInventory/GetAll', getCountInventoryIn)
  };
  //Funcion que ejetucta un servicio post para enviar objeto para crear los CountInventory
  Add(addCountInventoryIn: AddCountInventoryIn): Observable<AddCountInventoryOut> {
    return this._proxy.executePost('CountInventory/Add', addCountInventoryIn)
  };
  //Funcion que ejetucta un servicio post para enviar objeto para actualizar los CountInventory
  Update(updateCountInventoryIn: UpdateCountInventoryIn): Observable<UpdateCountInventoryOut> {
    return this._proxy.executePost('CountInventory/Update', updateCountInventoryIn)
  };
  //Funcion que ejetucta un servicio post para traer una reporte del detalle de CountInventory
  GetReport(getCountInventoryIn: GetResportCountInventoryIn): Observable<GetResportCountInventoryOut> {
    return this._proxy.executePost('CountInventory/GetReport', getCountInventoryIn)
  };
  //Funcion que ejetucta un servicio post para enviar objeto para crear el conteo de inventario
  CountInventory(addCountsProductsIn: AddCountsProductsIn): Observable<AddCountsProductsOut> {
    return this._proxy.executePost('CountInventory/CountInventory', addCountsProductsIn)
  };

  private subject = new Subject<any>();
  ExecuteShareEvent() {
    this.subject.next();
  }

  GetExecuteShareEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}