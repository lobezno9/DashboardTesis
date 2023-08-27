import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { BaseService } from './base.service';
import { GetAllProfileIn } from '../shared/methodparameters/Profile/GetAllProfileIn';
import { GetAllProfileOut } from '../shared/methodparameters/Profile/GetAllProfileOut';
import { AddProfileIn } from '../shared/methodparameters/Profile/AddProfileIn';
import { AddProfileOut } from '../shared/methodparameters/Profile/AddProfileOut';
import { UpdateProfileOut } from '../shared/methodparameters/Profile/UpdateProfileOut';
import { UpdateProfileIn } from '../shared/methodparameters/Profile/UpdateProfileIn';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private _proxy: BaseService;

    public get proxy(): BaseService {
        return this._proxy;
    }

    constructor(http: HttpClient, protected router: Router) {
        this._proxy = new BaseService(http, router);
    }
    //Funcion que ejetucta un servicio post para traer una lista de Profile
    GetAll(getAllProfileIn: GetAllProfileIn): Observable<GetAllProfileOut> {
        return this._proxy.executePost('Profile/GetAll', getAllProfileIn)
    };
    //Funcion que ejetucta un servicio post para enviar objeto para crear los Profile
    Add(addProfileIn: AddProfileIn): Observable<AddProfileOut> {
        return this._proxy.executePost('Profile/Add', addProfileIn)
    };
    //Funcion que ejetucta un servicio post para enviar objeto para actualizar los Profile
    Update(updateProfileIn: UpdateProfileIn): Observable<UpdateProfileOut> {
        return this._proxy.executePost('Profile/Update', updateProfileIn)
    };
    //Funcion que ejetucta un servicio post para enviar objeto para eliminar los Profile
    Delete(updateProfileIn: UpdateProfileIn): Observable<UpdateProfileOut> {
        return this._proxy.executePost('Profile/Delete', updateProfileIn)
    };

    private subject = new Subject<any>();
    ExecuteShareEvent() {
        this.subject.next();
    }

    GetExecuteShareEvent(): Observable<any> {
        return this.subject.asObservable();
    }
}