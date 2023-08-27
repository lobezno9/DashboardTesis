import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from 'src/app/service/alert.service';
import { PermissionService } from 'src/app/service/permission.service';
import { Result } from 'src/app/shared/general/Result';
import { GetPermissionIn } from 'src/app/shared/methodparameters/Permission/GetPermissionIn';
import { Option } from 'src/app/shared/models/Option';
import { Permission } from 'src/app/shared/models/Permission';

@Component({
  selector: 'app-menu-item-manager',
  templateUrl: './menu-item-manager.component.html',
  styleUrls: ['./menu-item-manager.component.css']
})
export class MenuItemManagerComponent implements OnInit {
  /**
   * Decoradores de tipo imput item y depth
   * item : recibe un dato de tipo eny que puede recibir una lista
   * depth: recibe un dato de tipo number para definir padding-left
   */
  @Input() item: any;
  @Input() depth: number;
  //Variables de Formulario
  filterPermission: GetPermissionIn;
  ListPermission: Permission[];
  flag: boolean;

  constructor(
    private permissionService: PermissionService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.flag = this.item.listPermission.length > 0 ? true : false
    if (this.depth === undefined) {
      this.depth = 0;
    }
    this.GetPermission();
  }
  //Funcion que agraga una nueva opcion al menu
  AddElement() {
    if (!this.item.listOption) {
      this.item.listOption = [];
    }
    let newOption: Option = { listPermission: this.ListPermission };
    this.item.listOption.push(newOption);
  }
  //Funcion que remueve una opcion del menu
  RemoveElement() {
    if (!this.item.listOption) { this.item.isToRemove = true; }
    else {
      this.alertService.confirm('', "¿Esta seguro que desea eliminar a " + this.item.description + "?").subscribe((res) => {
        if (res) {
          this.item.isToRemove = true;
        }
      });
    }
  }
  //Funcion que obtiene una lista de permisos
  GetPermission() {
    this.filterPermission = { permission: null }
    this.permissionService.GetAll(this.filterPermission).subscribe(data => {
      if (data.result == Result.Success) {
        this.ListPermission = data.listPermission
      }
    })
  }

}
