import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/app/service/alert.service';
import { UserTypeService } from 'src/app/service/userType.service';
import { Result } from 'src/app/shared/general/Result';
import { AddUserTypeIn } from 'src/app/shared/methodparameters/UserType/AddUserTypeIn';
import { UserType } from 'src/app/shared/models/UserType';

@Component({
  selector: 'app-user-type-create',
  templateUrl: './user-type-create.component.html',
  styleUrls: ['./user-type-create.component.css']
})
export class UserTypeCreateComponent implements OnInit {
  //Decoradors de tipo Input que recibe un objeto de typo UserType
  @Input() UserTypeModel: UserType;
  //Variables del formulario
  formCreateUserType: FormGroup;
  showLoader: boolean = true;

  constructor(
    private toastr: ToastrService,
    private modal: NgbModal,
    private userTypeService: UserTypeService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.showLoader = false;

    if (this.UserTypeModel !== undefined && this.UserTypeModel !== null) {
      this.CreateFormEdit(this.UserTypeModel)
    }
    else {
      this.CreateFrom();
    }
  }
  //Funcion que crea el formulario para crear el tipo de usuario
  CreateFrom() {
    this.formCreateUserType = new FormGroup({
      id: new FormControl(0, Validators.required),
      description: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
    })
  }
  //Funcion que crea el formulario para editar el tipo de usuario
  CreateFormEdit(itemUserType: UserType) {
    this.formCreateUserType = new FormGroup({
      id: new FormControl(itemUserType.id, Validators.required),
      description: new FormControl(itemUserType.description, [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
    })
  }
  //Funcionn dinamica que usa un servicio para editar o actualizar el tipo de inventario
  OnSubmit() {
    this.alertService.confirm('', '¿Esta seguro que desea Guardar?').subscribe(res => {
      if (res) {
        let addUserTypeIn: AddUserTypeIn = {
          userType: this.formCreateUserType.value
        };
        if (this.formCreateUserType.controls.id.value !== null && this.formCreateUserType.controls.id.value !== undefined
          && this.formCreateUserType.controls.id.value !== 0) {
          this.userTypeService.Update(addUserTypeIn).subscribe(data => {
            if (data.result === Result.Success) {
              this.toastr.success("Se actualizo correctamente");
              this.modal.dismissAll();
              this.userTypeService.ExecuteShareEvent();
            } else {
              this.toastr.error("Ocurrio un error, por favor intente de nuevo");
              console.log(data);
            }
          });
        } else {
          this.userTypeService.Add(addUserTypeIn).subscribe(data => {
            if (data.result === Result.Success && data.id !== null && data.id > 0) {
              this.toastr.success("Se almaceno correctamente");
              this.modal.dismissAll();
              this.userTypeService.ExecuteShareEvent();
            } else {
              this.toastr.error("Ocurrio un error, por favor intente de nuevo");
              console.log(data);
            }
          });
        }

      } else {
        this.userTypeService.ExecuteShareEvent();
      }
    });
  }

}
