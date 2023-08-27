import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HoraAccesoGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    // Obtenemos la hora actual  
    const hora = new Date().getHours();

    // Comparamos la hora con el maximo permitido
    // Esto sería en caso de que no queremos que 
    // puedan entrar a la página después de las 10:00 pm  
    if (hora >= 22) {
      // if (hora >= 16) {
      // Si la hora es mayor o igual redireccionamos al loginComponent
      this.toastr.warning("Se desactivo la pagina")
      this.router.navigate(['/Login']);
      // Si devolvemos FALSE no de permitirá el acceso
      return false;
    }
    // Comparamos la hora con el minimo permitido
    // Esto sería en caso de que no queremos que 
    // puedan entrar a la página antes de las 5:00 am  
    if (hora <= 5) {
      // Si la hora es menor o igual redireccionamos al loginComponent
      this.toastr.warning("Se encuentra desactivada la pagina")
      this.router.navigate(['/Login']);
      // Si devolvemos FALSE no de permitirá el acceso
      return false;
    }

    // Si devolvemos TRUE si se permitirá el acceso.
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Obtenemos la hora actual  
    const hora = new Date().getHours();
    const min = new Date().getMinutes();
    // Comparamos la hora con el maximo permitido
    // Esto sería en caso de que no queremos que 
    // puedan entrar a la página después de las 10:00 pm  
    if (hora >= 22) {
      // if (min >= 38) {
      // Si la hora es mayor o igual redireccionamos al loginComponent
      this.toastr.warning("Se desactivo la pagina")
      this.router.navigate(['/']);
      // Si devolvemos FALSE no de permitirá el acceso
      return false;
    }
    // Comparamos la hora con el minimo permitido
    // Esto sería en caso de que no queremos que 
    // puedan entrar a la página antes de las 5:00 am  
    if (hora < 5) {
      // Si la hora es menor o igual redireccionamos al loginComponent
      this.toastr.warning("Se encuentra desactivada la pagina")
      this.router.navigate(['/']);
      // Si devolvemos FALSE no de permitirá el acceso
      return false;
    }

    // Si devolvemos TRUE si se permitirá el acceso.
    return true;
  }
}
