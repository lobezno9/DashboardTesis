import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AddGroupIn } from '../shared/methodparameters/Group/AddGroupIn';
import { AddGroupOut } from '../shared/methodparameters/Group/AddGroupOut';
import { GetGroupIn } from '../shared/methodparameters/Group/GetGroupIn';
import { GetGroupOut } from '../shared/methodparameters/Group/GetGroupOut';
import { UpdateGroupIn } from '../shared/methodparameters/Group/UpdateGroupIn';
import { UpdateGroupOut } from '../shared/methodparameters/Group/UpdateGroupOut';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class GroupService {
    private _proxy: BaseService;

    public get proxy(): BaseService {
        return this._proxy;
    }

    constructor(http: HttpClient, protected router: Router) {
        this._proxy = new BaseService(http, router);
    }
    //Funcion que ejetucta un servicio post para traer una lista de Group
    GetAll(getGroupIn: GetGroupIn): Observable<GetGroupOut> {
        return this._proxy.executePost('Group/GetAll', getGroupIn)
    };
    //Funcion que ejetucta un servicio post para enviar objeto para crear los Group
    Add(addGroupIn: AddGroupIn): Observable<AddGroupOut> {
        return this._proxy.executePost('Group/Add', addGroupIn)
    };
    //Funcion que ejetucta un servicio post para enviar objeto para actualizar los Group
    Update(updateGroupIn: UpdateGroupIn): Observable<UpdateGroupOut> {
        return this._proxy.executePost('Group/Update', updateGroupIn)
    };
    //Funcion que ejetucta un servicio post para enviar objeto para eliminar los Group
    Delete(updateGroupIn: UpdateGroupIn): Observable<UpdateGroupOut> {
        return this._proxy.executePost('Group/Delete', updateGroupIn)
    };

    private subject = new Subject<any>();
    ExecuteShareEvent() {
        this.subject.next();
    }

    GetExecuteShareEvent(): Observable<any> {
        return this.subject.asObservable();
    }
}