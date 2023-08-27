import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as constants from '../constants';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { GetAllOptionIn } from '../shared/methodparameters/Options/GetAllOptionIn';
import { GetAllOptionOut } from '../shared/methodparameters/Options/GetAllOptionOut';
import { GetAllOptionMenuOut } from '../shared/methodparameters/Options/GetAllOptionMenuOut';
import { AddOptionMenuIn } from '../shared/methodparameters/Options/AddOptionMenuIn';
import { AddOptionMenuOut } from '../shared/methodparameters/Options/AddOptionMenuOut';

@Injectable({
    providedIn: 'root'
})
export class OptionService {
    private _proxy: BaseService;

    public get proxy(): BaseService {
        return this._proxy;
    }

    constructor(http: HttpClient, protected router: Router) {
        this._proxy = new BaseService(http, router);
    }
    //Funcion que ejetucta un servicio post para traer una lista de Option
    GetAll(getAllOptionIn: GetAllOptionIn): Observable<GetAllOptionOut> {
        return this._proxy.executePost('Option/GetAll', getAllOptionIn)
    };
    //Funcion que ejetucta un servicio post para traer una lista del menu de Option
    GetAllMenu(getAllOptionIn: GetAllOptionIn): Observable<GetAllOptionMenuOut> {
        return this._proxy.executePost('Option/GetAllMenu', getAllOptionIn)
    };
    //Funcion que ejetucta un servicio post para enviar objeto para crear los Option
    AddMenu(addOptionMenuIn: AddOptionMenuIn): Observable<AddOptionMenuOut> {
        return this._proxy.executePost('Option/AddMenu', addOptionMenuIn)
    };

}
