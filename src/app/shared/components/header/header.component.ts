import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from 'src/app/service/nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  /**
   * Decoradores Admin y fullName de tipo boolean y string
   * Admin->recibe un true o false para mostrar la opcines de abministrador
   * fullName->ricibe un string con el nonbre del usuario
   */
  @Input() Admin: boolean = false;
  @Input() fullName: string = '';

  change: boolean = false;

  constructor(
    private router: Router,
    public navService: NavService
  ) { }

  ngOnInit(): void {
  }
  //Funcion que recireciona al login y cierra la sesion
  LogOut() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  ResetActiveClass() {
    // !this.change ? [this.navService.openNav(), this.change = !this.change] : [this.navService.closeNav(), this.change = !this.change];
    if (document.querySelector('.c-active'))
      document.querySelector('.c-active').classList.remove('c-active');
  }
}
