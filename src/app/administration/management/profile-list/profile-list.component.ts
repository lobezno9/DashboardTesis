import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/service/profile.service';
import { Result } from 'src/app/shared/general/Result';
import { GetAllProfileIn } from 'src/app/shared/methodparameters/Profile/GetAllProfileIn';
import { Profile } from 'src/app/shared/models/Profile';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/service/alert.service';


@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {

  //Variable de methodparameter que se utiliza para enviar un modelo al api para consultar
  filterProfile: GetAllProfileIn;
  //Variable de MatTableDataSource que define el modelo a utilizar
  dataSource: MatTableDataSource<Profile>;
  /**
   * Variable de tipo Array con los nombres de las columnas a utilizar
   * DEBEN SER LAS MISMOS NOMBRES DEL MODELO
   */
  displayedColumns: string[] = ['id', 'profileCode', 'description', 'isSuperAdmin', 'accion'];
  //Variable de tipo MatPaginator con un decorador utilizada para hacer paginacion
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //Variable de tipo MatSort con un decorador utilizada para Organizar la tabla por Columnas
  @ViewChild(MatSort) sort: MatSort;
  //Variables de formulariuo
  showLoader: boolean = true;
  itemSelected: Profile;
  closeResult: string;
  clickEventsubscription: Subscription;

  constructor(
    private toastr: ToastrService,
    private modalService: NgbModal,
    private ProfileServices: ProfileService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    //Inicializar funcion que trae todos los Perfiles
    this.GetProfile();
    this.clickEventsubscription = this.ProfileServices.GetExecuteShareEvent().subscribe(() => {
      this.GetProfile();
      this.modalService.dismissAll();
    })
    this.showLoader = false;
  }

  //Funcion que llama un servicio para traer todos los Perfiles
  GetProfile() {
    this.filterProfile = { profile: {} }
    this.ProfileServices.GetAll(this.filterProfile).subscribe(data => {
      if (data.result === Result.Success) {
        this.dataSource = new MatTableDataSource(data.listProfile);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  //Funcion que llama un servicio para Eliminar el Perfil
  DeleteProfile(Profile: Profile) {
    this.alertService.confirm('', "¿Esta seguro que desea eliminar a " + Profile.description + "?").subscribe((res) => {
      if (res) {
        this.filterProfile = { profile: Profile }
        this.ProfileServices.Delete(this.filterProfile).subscribe(data => {
          if (data.result === Result.Success) {
            this.toastr.info("Eliminado con exito");
            this.GetProfile();
          } else {
            this.toastr.warning("Ocurio un error");
            console.log(data);
          }
        })
      }
    });
  }

  //Funcion que recibe un evento
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //Funcion que llama el metodo para abrir la modal para crear tipos de perfiles
  open(content) {
    this.openModal(content);
  }
  //Funcion que llama el metodo para abrir la modal con la informacion de un item
  openEdit(content, itemPerfiles) {
    this.itemSelected = itemPerfiles;
    this.openModal(content);
  }
  //Funcion encargadad de definir y abir la modal
  openModal(content) {
    this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    this.itemSelected = null;
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
