import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { yearsPerPage } from '@angular/material/datepicker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/app/service/alert.service';
import { GroupService } from 'src/app/service/group.service';
import { Result } from 'src/app/shared/general/Result';
import { AddGroupIn } from 'src/app/shared/methodparameters/Group/AddGroupIn';
import { Group } from 'src/app/shared/models/Group';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit {
  //Decorador de tipo Input que recibe un objeto de tipo Group
  @Input() GroupModel: Group;
  //Variables del Formulario
  formCreateGroup: FormGroup;
  showLoader: boolean = true;
  datenow: Date;

  constructor(
    private toastr: ToastrService,
    private modal: NgbModal,
    private GroupService: GroupService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.showLoader = false;
    if (this.GroupModel !== undefined && this.GroupModel !== null) {
      this.CreateFormEdit(this.GroupModel)
    }
    else {
      this.CreateFrom();
    }
  }
  //Funcion que crea el formulario para crear Group
  CreateFrom() {
    this.formCreateGroup = new FormGroup({
      id: new FormControl(0, Validators.required),
      code: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      state: new FormControl(false, Validators.required),
    })
  }
  //Funcion que crea el formulario para editar los Group
  CreateFormEdit(itemGroup: Group) {
    this.formCreateGroup = new FormGroup({
      id: new FormControl(itemGroup.id, Validators.required),
      code: new FormControl(itemGroup.code, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      description: new FormControl(itemGroup.description, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      state: new FormControl(itemGroup.state, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    })
  }
  //Funcion que usa un servicio para crear o editar un usurio
  OnSubmit() {
    this.alertService.confirm('', '¿Esta seguro que desea Guardar?').subscribe(res => {
      if (res) {
        let addGroupIn: AddGroupIn = {
          group: {
            id: this.formCreateGroup.controls.id.value,
            code: this.formCreateGroup.controls.code.value,
            description: this.formCreateGroup.controls.description.value,
            timeStamp: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay(), new Date().getHours() - 5, new Date().getUTCMinutes()),
            state: this.formCreateGroup.controls.state.value,
            synchronized: '0',
          }
        };

        if (this.formCreateGroup.controls.id.value !== null && this.formCreateGroup.controls.id.value !== undefined
          && this.formCreateGroup.controls.id.value !== 0) {
          this.GroupService.Update(addGroupIn).subscribe(data => {
            if (data.result === Result.Success) {
              this.toastr.success("Se actualizo correctamente");
              this.modal.dismissAll();
              this.GroupService.ExecuteShareEvent();
            } else {
              this.toastr.error("Ocurrio un error, por favor intente de nuevo");
              console.log(data);
            }
          });
        } else {
          this.GroupService.Add(addGroupIn).subscribe(data => {
            if (data.result === Result.Success && data.id !== null && data.id > 0) {
              this.toastr.success("Se almaceno correctamente");
              this.modal.dismissAll();
              this.GroupService.ExecuteShareEvent();
            } else {
              this.toastr.error("Ocurrio un error, por favor intente de nuevo");
              console.log(data);
            }
          });
        }

      } else {
        this.GroupService.ExecuteShareEvent();
      }
    });
  }
}
