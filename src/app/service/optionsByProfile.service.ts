import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GetAllOptionsByProfileIn } from '../shared/methodparameters/OptionsByProfile/GetAllOptionsByProfileIn';

@Injectable({
    providedIn: 'root'
})

export class OptionsByProfileService {

    private _proxy: BaseService;

    public get proxy(): BaseService {
        return this._proxy;
    }

    constructor(http: HttpClient, protected router: Router) {
        this._proxy = new BaseService(http, router);
    }
    //Funcion que ejetucta un servicio post para traer una lista de OptionsByProfile
    GetAll(getAllUserIn: GetAllOptionsByProfileIn): Observable<GetAllOptionsByProfileIn> {
        return this._proxy.executePost('OptionsByProfile/GetAll', getAllUserIn)
    };

}