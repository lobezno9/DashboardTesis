import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/app/service/alert.service';
import { OptionService } from 'src/app/service/option.service';
import { PermissionService } from 'src/app/service/permission.service';
import { UsersService } from 'src/app/service/user.service';
import { Result } from 'src/app/shared/general/Result';
import { AddOptionMenuIn } from 'src/app/shared/methodparameters/Options/AddOptionMenuIn';
import { GetAllOptionIn } from 'src/app/shared/methodparameters/Options/GetAllOptionIn';
import { GetPermissionIn } from 'src/app/shared/methodparameters/Permission/GetPermissionIn';
import { Menu } from 'src/app/shared/models/Menu';
import { Option } from 'src/app/shared/models/Option';
import { Permission } from 'src/app/shared/models/Permission';

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.css']
})
export class OptionListComponent implements OnInit {
  //Varibles de formulario
  listMenu: Menu[];
  showLoader: boolean = true;
  filterMenu: GetAllOptionIn = new GetAllOptionIn();
  filterPermission: GetPermissionIn;
  ListPermission: Permission[];

  constructor(
    private toastr: ToastrService,
    private userService: UsersService,
    private optionService: OptionService,
    private permissionService: PermissionService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.GetMenu();
    this.GetPermission();
  }
  //Funcion para obtener una lista de opciones de menu con sus respectivos permisos
  GetMenu() {
    this.optionService.GetAllMenu(this.filterMenu).subscribe(data => {
      if (data.result === Result.Success) {
        this.listMenu = data.listMenu;
      }
      this.showLoader = false;
    });
  }
  //Funcion que agrega un nuevo menu
  AddMenu() {
    this.listMenu.push(new Menu);
  }
  //Funcion que agrega una nueva opcion al menu
  AddElement(item) {
    if (!item.listOption) {
      item.listOption = [];
    }
    let newOption: Option = { listPermission: this.ListPermission };
    item.listOption.push(newOption);
  }
  //Funcion que remueve un menu
  RemoveElement(item) {
    if (!item.listOption) {
      item.isToRemove = true;
    }
    else {
      this.alertService.confirm('', "¿Seguro que desea eliminar el elemento " + item.title + " ?").subscribe((res) => {
        if (res) {
          item.listOption.forEach(dataOption => {
            dataOption.isToRemove = true
            this.RecursionEelemenRemove({ option: dataOption });
          });
          item.isToRemove = true;
        }
      });
    }
  }
  //Funciuon de recursividad para marcar las opcines del menu como removidas
  RecursionEelemenRemove({ option }: { option: Option; }) {
    option.isToRemove = true
    if (option.listOption) {
      option.listOption.forEach(data => {
        this.RecursionEelemenRemove({ option: data });
      });
    }
  }
  //Funcion que usa un servicio para crear o editar el menu
  OnSubmit() {
    this.showLoader = true;
    let methodParameterIn: AddOptionMenuIn = {
      listMenu: this.listMenu
    }

    this.optionService.AddMenu(methodParameterIn).subscribe(data => {
      if (data.result == Result.Success) {
        this.toastr.success("Almacenado correctamente");
        this.GetMenu();
        this.userService.ExecuteShareEvent();
      } else {
        this.toastr.error("Ocurrio un error, por favor intente de nuevo");
        console.log(data);
      }
      this.showLoader = false;
    })
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
