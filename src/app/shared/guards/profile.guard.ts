import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DecodeTokenService } from 'src/app/service/decode-token.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private decodeToken: DecodeTokenService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // Obtenemos el token desde el proxy y se
    // decodificamos para obtener los claims
    let Claims = this.decodeToken.getDecodedAccessToken();
    // console.log(Claims.IsSuperAdmin,'SupAdm');
    // Comparamos si el perfil  isISuperAdmin es igual a 'True'
    if (Claims.IsSuperAdmin !== 'True') {
      // Noticicación de que no puede acceder
      this.toastr.warning("No tiene acceso a esta pagina")
      // Si el perfil no es superAdmin redireccionamos al homeComponent
      // this.router.navigate(['/Administration/Home']);
      // Si devolvemos FALSE no le permitirá el acceso
      return false;
    }
    // Si devolvemos TRUE si se le permitirá el acceso.
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Obtenemos el token desde el proxy y se
    // decodificamos para obtener los claims
    let Claims = this.decodeToken.getDecodedAccessToken();
    // console.log(Claims.IsSuperAdmin,'SupAdm');
    // Comparamos si el perfil  isISuperAdmin es igual a 'True'
    if (Claims.IsSuperAdmin !== 'True') {
      // Noticicación de que no puede acceder
      this.toastr.warning("No tiene acceso a esta pagina")
      // Si el perfil no es superAdmin redireccionamos al homeComponent
      this.router.navigate(['/Administration/Home']);
      // Si devolvemos FALSE no le permitirá el acceso
      return false;
    }
    // Si devolvemos TRUE si se le permitirá el acceso.
    return true;
  }
}
