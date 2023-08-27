import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/service/user.service';
import { Result } from 'src/app/shared/general/Result';
import { User } from 'src/app/shared/models/User';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetAllUserIn } from 'src/app/shared/methodparameters/User/GetAllUserIn';
import { ExportTableService } from 'src/app/service/export-table.service';
import { AlertService } from 'src/app/service/alert.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  //Variable de methodparameter que se utiliza para enviar un modelo al api para consultar
  filterUser: GetAllUserIn;
  //Variable de MatTableDataSource que define el modelo a utilizar
  dataSource: MatTableDataSource<User>;
  /**
   * Variable de tipo Array con los nombres de las columnas a utilizar
   * DEBEN SER LAS MISMOS NOMBRES DEL MODELO
   */
  displayedColumns: string[] = ['id', 'username', 'FullName', 'email', 'profile', 'isActive', 'modificationDate', 'accion'];
  //Variable de tipo MatPaginator con un decorador utilizada para hacer paginacion
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //Variable de tipo MatSort con un decorador utilizada para Organizar la tabla por Columnas
  @ViewChild(MatSort) sort: MatSort;
  //Variables del formulario
  showLoader: boolean = true;
  itemSelected: User;
  closeResult: string;
  clickEventsubscription: Subscription;

  constructor(
    private toastr: ToastrService,
    private modalService: NgbModal,
    private UserServices: UsersService,
    private exportTableService: ExportTableService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    //Inicializar funcion que trae todos los permisos
    this.GetUser();
    this.clickEventsubscription = this.UserServices.GetExecuteShareEvent().subscribe(() => {
      this.modalService.dismissAll();
      this.GetUser();
    })
    this.showLoader = false;
  }

  //Funcion que llama un servicio para traer todos los Permisos
  GetUser() {
    this.filterUser = { user: {} }
    this.UserServices.GetAll(this.filterUser).subscribe(data => {
      if (data.result === Result.Success) {
        this.dataSource = new MatTableDataSource(data.listUser);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }
  //Funcion que recibe un evento
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //Funcion que llama un servicio para Eliminar el Usuario
  DeleteUser(User: User) {
    this.alertService.confirm('', "¿Esta seguro que desea eliminar a " + User.firstName + " " + User.lastName + "?").subscribe((res) => {
      if (res) {
        this.filterUser = { user: User }
        this.UserServices.Delete(this.filterUser).subscribe(data => {
          if (data.result === Result.Success) {
            this.toastr.info("Eliminado con exito");
            this.GetUser();
          } else {
            this.toastr.warning("Ocurio un error");
            console.log(data);
          }
        })
      }
    })
  }
  //Funcion que llama el metodo para abrir la modal para crear tipos de usuario
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
  //Funcion encargada de cerrar la modal
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
  //Funcion que usa un servicio para exportar una tabla
  exportTable() {
    this.alertService.confirm('', "Seguro desea exportar a excel").subscribe((res) => {
      if (res) {
        this.exportTableService.exportTableToExcel("ExportTable", "User");
      }
    })
  }
}
