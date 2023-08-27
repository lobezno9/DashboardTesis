import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
// import { AddCountInventoryDetailIn } from '../shared/methodparameters/CountInventoryDetail/AddCountInventoryDetailIn';
// import { AddCountInventoryDetailOut } from '../shared/methodparameters/CountInventoryDetail/AddCountInventoryDetailOut';
import { GetCountInventoryDetailIn } from '../shared/methodparameters/CountInventoryDetail/GetCountInventoryDetailIn';
import { GetCountInventoryDetailOut } from '../shared/methodparameters/CountInventoryDetail/GetCountInventoryDetailOut';
// import { UpdateCountInventoryDetailIn } from '../shared/methodparameters/CountInventoryDetail/UpdateCountInventoryDetailIn';
// import { UpdateCountInventoryDetailOut } from '../shared/methodparameters/CountInventoryDetail/UpdateCountInventoryDetailOut';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CountInventoryDetailDetailService {

  private _proxy: BaseService;

  public get proxy(): BaseService {
    return this._proxy;
  }

  constructor(http: HttpClient, protected router: Router) {
    this._proxy = new BaseService(http, router);
  }
  //Funcion que ejetucta un servicio post para traer una lista de CountInventoryDetail
  GetAll(getCountInventoryDetailIn: GetCountInventoryDetailIn): Observable<GetCountInventoryDetailOut> {
    return this._proxy.executePost('CountInventoryDetail/GetAll', getCountInventoryDetailIn)
  };

  // Add(addCountInventoryDetailIn: AddCountInventoryDetailIn): Observable<AddCountInventoryDetailOut> {
  //   return this._proxy.executePost('CountInventoryDetail/Add', addCountInventoryDetailIn)
  // };

  // Update(updateCountInventoryDetailIn: UpdateCountInventoryDetailIn): Observable<UpdateCountInventoryDetailOut> {
  //   return this._proxy.executePost('CountInventoryDetail/Update', updateCountInventoryDetailIn)
  // };
}