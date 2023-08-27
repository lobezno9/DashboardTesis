import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AddPermissionIn } from '../shared/methodparameters/Permission/AddPermissionIn';
import { AddPermissionOut } from '../shared/methodparameters/Permission/AddPermissionOut';
import { GetPermissionIn } from '../shared/methodparameters/Permission/GetPermissionIn';
import { GetPermissionOut } from '../shared/methodparameters/Permission/GetPermissionOut';
import { UpdatePermissionIn } from '../shared/methodparameters/Permission/UpdatePermissionIn';
import { UpdatePermissionOut } from '../shared/methodparameters/Permission/UpdatePermissionOut';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class PermissionService {
    private _proxy: BaseService;

    public get proxy(): BaseService {
        return this._proxy;
    }

    constructor(http: HttpClient, protected router: Router) {
        this._proxy = new BaseService(http, router);
    }

    //Funcion que ejetucta un servicio post para traer una lista de Permission
    GetAll(getPermissionIn: GetPermissionIn): Observable<GetPermissionOut> {
        return this._proxy.executePost('Permission/GetAll', getPermissionIn)
    };
    //Funcion que ejetucta un servicio post para enviar objeto para crear los Permission
    Add(addPermissionIn: AddPermissionIn): Observable<AddPermissionOut> {
        return this._proxy.executePost('Permission/Add', addPermissionIn)
    };
    //Funcion que ejetucta un servicio post para enviar objeto para actualizar los Permission
    Update(updatePermissionIn: UpdatePermissionIn): Observable<UpdatePermissionOut> {
        return this._proxy.executePost('Permission/Update', updatePermissionIn)
    };
    //Funcion que ejetucta un servicio post para enviar objeto para eliminar los Permission
    Delete(updatePermissionIn: UpdatePermissionIn): Observable<UpdatePermissionOut> {
        return this._proxy.executePost('Permission/Delete', updatePermissionIn)
    };

    private subject = new Subject<any>();
    ExecuteShareEvent() {
        this.subject.next();
    }

    GetExecuteShareEvent(): Observable<any> {
        return this.subject.asObservable();
    }
}