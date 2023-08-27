import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as constants from '../constants';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { GetAllUserIn } from '../shared/methodparameters/User/GetAllUserIn';
import { GetAllUserOut } from '../shared/methodparameters/User/GetAllUserOut';
import { AddUserIn } from '../shared/methodparameters/User/AddUserIn';
import { AddUserOut } from '../shared/methodparameters/User/AddUserOut';
import { UpdateUserIn } from '../shared/methodparameters/User/UpdateUserIn';
import { UpdateUserOut } from '../shared/methodparameters/User/UpdateUserOut';
import { GetAllOptionMenuOut } from '../shared/methodparameters/Options/GetAllOptionMenuOut';



@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private _proxy: BaseService;

    public get proxy(): BaseService {
        return this._proxy;
    }

    constructor(http: HttpClient, protected router: Router) {
        this._proxy = new BaseService(http, router);
    }
    //Funcion que ejetucta un servicio post para traer una lista de User
    GetAll(getAllUserIn: GetAllUserIn): Observable<GetAllUserOut> {
        return this._proxy.executePost('User/GetAll', getAllUserIn)
    };
    //Funcion que ejetucta un servicio post para enviar objeto para crear los User
    Add(addUserIn: AddUserIn): Observable<AddUserOut> {
        return this._proxy.executePost('User/Add', addUserIn)
    };
    //Funcion que ejetucta un servicio post para enviar objeto para actualizar los User
    Update(updateUserIn: UpdateUserIn): Observable<UpdateUserOut> {
        return this._proxy.executePost('User/Update', updateUserIn)
    };
    //Funcion que ejetucta un servicio post para enviar objeto para eliminar los User
    Delete(updateUserIn: UpdateUserIn): Observable<UpdateUserOut> {
        return this._proxy.executePost('User/Delete', updateUserIn)
    };
    //Funcion que ejetucta un servicio post para enviar objeto para actualizar el password User
    UpdatePassword(updateUserIn: UpdateUserIn): Observable<UpdateUserOut> {
        return this._proxy.executePost('Auth/UpdatePassword', updateUserIn)
    };


    GetOptions(): Observable<GetAllOptionMenuOut> {
        return this._proxy.executePost('Option/GetByUser')
    };

    private subject = new Subject<any>();
    ExecuteShareEvent() {
        this.subject.next();
    }

    GetExecuteShareEvent(): Observable<any> {
        return this.subject.asObservable();
    }

    private subjectLogin = new Subject<any>();
    ExecuteShareEventLogin() {
        this.subjectLogin.next();
    }

    GetExecuteShareEventLogin(): Observable<any> {
        return this.subjectLogin.asObservable();
    }
}