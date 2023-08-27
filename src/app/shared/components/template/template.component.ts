import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavService } from 'src/app/service/nav.service';
import { UsersService } from 'src/app/service/user.service';
import { Result } from '../../general/Result';
import { Menu } from '../../models/Menu';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  //Decorador de tipo ViewChild para cerrar o abrir nav
  @ViewChild('appDrawer') appDrawer: ElementRef;
  @ViewChild('sideEnd') sideEnd: ElementRef;
  //Variables para el componente
  year = new Date().getFullYear()
  listMenu: Menu[];
  fullName: string;
  isSuperAdmin: boolean;
  isOptionalActive: boolean = true;
  isSidebarShow = true;

  constructor(
    private router: Router,
    public navService: NavService,
    private userService: UsersService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.GetOptions();
    this.userService.GetExecuteShareEvent().subscribe(() => {
      this.GetOptions();
    });
  }
  /**
   * Funcion que llama el servicio de GetOptions para 
   * traer las opciones del menu con sus respectivos 
   * permisos por perfil
   */
  GetOptions(): void {
    this.userService.GetOptions().subscribe(data => {
      if (data.result == Result.Success) {
        if (data.listMenu.length === 0) {
          this.toastr.warning("Su Perfil no posee ninguna Opcion de Menu")
        }
        this.fullName = data.fullName;
        this.listMenu = data.listMenu;
        this.isSuperAdmin = data.isSuperAdmin;
      }
    });
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
    this.navService.sideEnd = this.sideEnd;
  }
  //Funcion que redirige al componete Home
  OnRedirect() {
    this.router.navigate(['Administration/Home']);
    this.navService.closeNav();
  }
}
