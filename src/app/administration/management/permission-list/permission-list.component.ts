import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from 'src/app/service/permission.service';
import { Result } from 'src/app/shared/general/Result';
import { GetPermissionIn } from 'src/app/shared/methodparameters/Permission/GetPermissionIn';
import { Permission } from 'src/app/shared/models/Permission';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/service/alert.service';
import { ExportTableService } from 'src/app/service/export-table.service';


@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.css']
})
export class PermissionListComponent implements OnInit {
  //Variable de methodparameter que se utiliza para enviar un modelo al api para consultar
  filterPermission: GetPermissionIn;
  //Variable de MatTableDataSource que define el modelo a utilizar
  dataSource: MatTableDataSource<Permission>;
  /**
   * Variable de tipo Array con los nombres de las columnas a utilizar
   * DEBEN SER LAS MISMOS NOMBRES DEL MODELO
   */
  displayedColumns: string[] = ['id', 'description', 'accion'];
  //Variable de tipo MatPaginator con un decorador utilizada para hacer paginacion
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //Variable de tipo MatSort con un decorador utilizada para Organizar la tabla por Columnas
  @ViewChild(MatSort) sort: MatSort;
  //Variables de formulario
  showLoader: boolean = true;
  itemSelected: Permission;
  closeResult: string;
  clickEventsubscription: Subscription;

  constructor(
    private toastr: ToastrService,
    private modalService: NgbModal,
    private permissionServices: PermissionService,
    private exportTableService: ExportTableService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    //Inicializar funcion que trae todos los permisos
    this.GetPermission();
    this.clickEventsubscription = this.permissionServices.GetExecuteShareEvent().subscribe(() => {
      this.modalService.dismissAll();
      this.GetPermission();
    })
    this.showLoader = false;
  }

  //Funcion que llama un servicio para traer todos los Permisos
  GetPermission() {
    this.filterPermission = { permission: {} }
    this.permissionServices.GetAll(this.filterPermission).subscribe(data => {
      if (data.result === Result.Success) {
        this.dataSource = new MatTableDataSource(data.listPermission);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }
  //Funcion que llama un servicio para Eliminar el Grupo
  DeleteUserType(Permission: Permission) {
    this.alertService.confirm('', "¿Esta seguro que desea eliminar a " + Permission.description + "?").subscribe((res) => {
      if (res) {
        this.filterPermission = { permission: Permission }
        this.permissionServices.Delete(this.filterPermission).subscribe(data => {
          if (data.result === Result.Success) {
            this.toastr.info("Eliminado con exito");
            this.GetPermission();
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
  //Funcion que llama el metodo para abrir la modal para crear permisos
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
    this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then((result) => {
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
