import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/app/service/alert.service';
import { PermissionService } from 'src/app/service/permission.service';
import { Result } from 'src/app/shared/general/Result';
import { AddPermissionIn } from 'src/app/shared/methodparameters/Permission/AddPermissionIn';
import { Permission } from 'src/app/shared/models/Permission';

@Component({
  selector: 'app-permission-create',
  templateUrl: './permission-create.component.html',
  styleUrls: ['./permission-create.component.css']
})
export class PermissionCreateComponent implements OnInit {
  //Decorador de tipo Input que recibe un objeto de tipo Permission
  @Input() PermissionModel: Permission;
  //Variables del Formulario
  formCreatePermission: FormGroup;
  showLoader: boolean = true;

  constructor(
    private toastr: ToastrService,
    private modal: NgbModal,
    private PermissionService: PermissionService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.showLoader = false;
    if (this.PermissionModel !== undefined && this.PermissionModel !== null) {
      this.CreateFormEdit(this.PermissionModel)
    }
    else {
      this.CreateFrom();
    }
  }
  //Funcion que crea el formulario para crear Permisos
  CreateFrom() {
    this.formCreatePermission = new FormGroup({
      id: new FormControl(0, Validators.required),
      description: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    })
  }
  //Funcion que crea el formulario para editar los Permisos
  CreateFormEdit(itemPermission: Permission) {
    this.formCreatePermission = new FormGroup({
      id: new FormControl(itemPermission.id, Validators.required),
      description: new FormControl(itemPermission.description, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    })
  }
  //Funcion que usa un servicio para crear o editar un Permisos
  OnSubmit() {
    this.alertService.confirm('', '¿Esta seguro que desea Guardar?').subscribe(res => {
      if (res) {
        let addPermissionIn: AddPermissionIn = {
          permission: this.formCreatePermission.value
        };
        if (this.formCreatePermission.controls.id.value !== null && this.formCreatePermission.controls.id.value !== undefined
          && this.formCreatePermission.controls.id.value !== 0) {
          this.PermissionService.Update(addPermissionIn).subscribe(data => {
            if (data.result === Result.Success) {
              this.toastr.success("Se actualizo correctamente");
              this.modal.dismissAll();
              this.PermissionService.ExecuteShareEvent();
            } else {
              this.toastr.error("Ocurrio un error, por favor intente de nuevo");
              console.log(data);
            }
          });
        } else {
          this.PermissionService.Add(addPermissionIn).subscribe(data => {
            if (data.result === Result.Success && data.id != null && data.id > 0) {
              this.toastr.success("Se almaceno correctamente");
              this.modal.dismissAll();
              this.PermissionService.ExecuteShareEvent();
            } else {
              this.toastr.error("Ocurrio un error, por favor intente de nuevo");
              console.log(data);
            }
          });
        }
      } else {
        this.PermissionService.ExecuteShareEvent();
      }
    });
  }

}
