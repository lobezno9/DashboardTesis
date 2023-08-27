import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AddUserTypeIn } from '../shared/methodparameters/UserType/AddUserTypeIn';
import { AddUserTypeOut } from '../shared/methodparameters/UserType/AddUserTypeOut';
import { GetUserTypeIn } from '../shared/methodparameters/UserType/GetUserTypeIn';
import { GetUserTypeOut } from '../shared/methodparameters/UserType/GetUserTypeOut';
import { UpdateUserTypeIn } from '../shared/methodparameters/UserType/UpdateUserTypeIn';
import { UpdateUserTypeOut } from '../shared/methodparameters/UserType/UpdateUserTypeOut';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class UserTypeService {
    private _proxy: BaseService;

    public get proxy(): BaseService {
        return this._proxy;
    }

    constructor(http: HttpClient, protected router: Router) {
        this._proxy = new BaseService(http, router);
    }
    //Funcion que ejetucta un servicio post para traer una lista de UserType
    GetAll(getUserTypeIn: GetUserTypeIn): Observable<GetUserTypeOut> {
        return this._proxy.executePost('UserType/GetAll', getUserTypeIn)
    };
    //Funcion que ejetucta un servicio post para enviar objeto para crear los UserType
    Add(addUserTypeIn: AddUserTypeIn): Observable<AddUserTypeOut> {
        return this._proxy.executePost('UserType/Add', addUserTypeIn)
    };
    //Funcion que ejetucta un servicio post para enviar objeto para actualizar los UserType
    Update(updateUserTypeIn: UpdateUserTypeIn): Observable<UpdateUserTypeOut> {
        return this._proxy.executePost('UserType/Update', updateUserTypeIn)
    };
    //Funcion que ejetucta un servicio post para enviar objeto para eliminar los UserType
    Delete(updateUserTypeIn: UpdateUserTypeIn): Observable<UpdateUserTypeOut> {
        return this._proxy.executePost('UserType/Delete', updateUserTypeIn)
    };

    private subject = new Subject<any>();
    ExecuteShareEvent() {
        this.subject.next();
    }

    GetExecuteShareEvent(): Observable<any> {
        return this.subject.asObservable();
    }
}