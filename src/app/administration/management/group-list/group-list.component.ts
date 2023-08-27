import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { GroupService } from 'src/app/service/group.service';
import { Result } from 'src/app/shared/general/Result';
import { GetGroupIn } from 'src/app/shared/methodparameters/Group/GetGroupIn';
import { Group } from 'src/app/shared/models/Group';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/service/alert.service';


@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  //Variable de methodparameter que se utiliza para enviar un modelo al api para consultar
  filterGroup: GetGroupIn;
  //Variable de MatTableDataSource que define el modelo a utilizar
  dataSource: MatTableDataSource<Group>;
  /**
   * Variable de tipo Array con los nombres de las columnas a utilizar
   * DEBEN SER LAS MISMOS NOMBRES DEL MODELO
   */
  displayedColumns: string[] = ['id', 'code', 'description', 'timeStamp', 'accion'];
  //Variable de tipo MatPaginator con un decorador utilizada para hacer paginacion
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //Variable de tipo MatSort con un decorador utilizada para Organizar la tabla por Columnas
  @ViewChild(MatSort) sort: MatSort;
  //Variables de formulario
  showLoader: boolean = true;
  itemSelected: Group;
  closeResult: string;
  clickEventsubscription: Subscription;

  constructor(
    private toastr: ToastrService,
    private modalService: NgbModal,
    private GroupServices: GroupService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    //Inicializar funcion que trae todos los Grupos
    this.GetGroup();
    this.clickEventsubscription = this.GroupServices.GetExecuteShareEvent().subscribe(() => {
      this.modalService.dismissAll();
      this.GetGroup();
    })
    this.showLoader = false;
  }

  //Funcion que llama un servicio para traer todos los Grupos
  GetGroup() {
    this.filterGroup = { group: {} }
    this.GroupServices.GetAll(this.filterGroup).subscribe(data => {
      if (data.result === Result.Success) {
        this.dataSource = new MatTableDataSource(data.listGroup);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }
  //Funcion que llama un servicio para Eliminar el Grupo
  DeleteGroup(Group: Group) {
    this.alertService.confirm('', "¿Esta seguro que desea eliminar a " + Group.description + "?").subscribe((res) => {
      if (res) {
        this.filterGroup = { group: Group }
        this.GroupServices.Delete(this.filterGroup).subscribe(data => {
          if (data.result === Result.Success) {
            this.GetGroup();
            this.toastr.info("Eliminado con exito");
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
  //Funcion que llama el metodo para abrir la modal para crear Grupo
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
}
