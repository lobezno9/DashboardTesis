import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { DecodeTokenService } from 'src/app/service/decode-token.service';
import { BaseService } from 'src/app/service/base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private decodeToken: DecodeTokenService,
    private _proxy: BaseService

  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Obtenemos el token desde el proxy y se
    // decodificamos para obtener los claims
    let Claims = this.decodeToken.getDecodedAccessToken();
    // Obtenemos la fecha actual  
    const fechaA = new Date()
    // console.log(fechaA);

    //Pasar milliseconds a fecha
    const milliseconds = Claims.exp
    const dateObject = new Date(milliseconds * 1000)
    // console.log(dateObject);

    if (dateObject <= fechaA) {
      // Noticicación de que no puede acceder
      this.toastr.warning("La sesión se vencio")
      // Si el perfil no es superAdmin redireccionamos al LoginComponent
      this.router.navigate(['/']);
      // Si devolvemos FALSE no le permitirá el acceso
      return false;
    }
    var fecha1 = moment(fechaA, "YYYY-MM-DD HH:mm:ss");
    var fecha2 = moment(dateObject, "YYYY-MM-DD HH:mm:ss");
    var diff1 = fecha2.diff(fecha1, 'm');
    if (diff1 <= 1) {
      this.toastr.info("Renueve su ingreso, le queda menos de 1 minuto")
    }
    // console.log(diff1);

    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._proxy.token === '') {
      // Noticicación de que no puede acceder
      this.toastr.warning("No tiene acceso")
      // Si no esta autenticado redireccionamos al LoginComponent
      this.router.navigate(['/']);
      // Si devolvemos FALSE no le permitirá el acceso
      return false;
    }
    // Si devolvemos TRUE si se permitirá el acceso.
    return true;
  }
}
