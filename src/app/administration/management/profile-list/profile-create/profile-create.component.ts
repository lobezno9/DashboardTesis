import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { OptionService } from 'src/app/service/option.service';
import { ProfileService } from 'src/app/service/profile.service';
import { Profile } from 'src/app/shared/models/Profile';
import { Option } from 'src/app/shared/models/Option';
import { Menu } from 'src/app/shared/models/Menu';
import { GetAllOptionIn } from 'src/app/shared/methodparameters/Options/GetAllOptionIn';
import { GetAllProfileIn } from 'src/app/shared/methodparameters/Profile/GetAllProfileIn';
import { Result } from 'src/app/shared/general/Result';
import { AddProfileIn } from 'src/app/shared/methodparameters/Profile/AddProfileIn';
import { UpdateProfileIn } from 'src/app/shared/methodparameters/Profile/UpdateProfileIn';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-profile-create',
  templateUrl: './profile-create.component.html',
  styleUrls: ['./profile-create.component.css']
})
export class ProfileCreateComponent implements OnInit {
  //Decorador de tipo Input que recibe un objeto de tipo Profile
  @Input() ProfileModel: Profile;
  //Variables del Formulario

  formCreateProfile: FormGroup;
  listOptionSelected: Option[];
  listMenu: Menu[];
  listMenuByProfileId: Menu[];
  filterMenu: GetAllOptionIn = new GetAllOptionIn();
  filterMenuId: GetAllOptionIn = new GetAllOptionIn();

  clickEventsubscription: Subscription;
  profile: Profile;
  getAllProfileIn: GetAllProfileIn;
  filterOption: GetAllOptionIn;
  listOptions: Option[];
  showLoader: boolean = true;


  constructor(
    private toastr: ToastrService,
    private ProfileService: ProfileService,
    private OptionService: OptionService,
    private modal: NgbModal,
    private alertService: AlertService,

  ) { }

  ngOnInit(): void {
    this.showLoader = true;
    // this.CreateForm(this.ProfileModel ?? new Profile());
    if (this.ProfileModel !== undefined && this.ProfileModel !== null) {
      this.CreateFormEdit(this.ProfileModel)
    }
    else {
      this.CreateForm();
    }
    this.GetMenu();
  }
  //Funcion que crea el formulario para crear perfiles
  CreateForm() {
    this.formCreateProfile = new FormGroup({
      id: new FormControl(0),
      profileCode: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
      isSuperAdmin: new FormControl(false, Validators.required),
      options: new FormArray([])

    })
  }
  //Funcion que crea el formulario para editar los perfiles
  CreateFormEdit(itemProfile: Profile) {
    this.formCreateProfile = new FormGroup({
      id: new FormControl(itemProfile.id, Validators.required),
      profileCode: new FormControl(itemProfile.profileCode, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]),
      description: new FormControl(itemProfile.description, [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
      isSuperAdmin: new FormControl(itemProfile.isSuperAdmin),
      options: new FormArray([])
    })
  }
  //Funcion que usa un servicio para crear o editar un perfiles
  OnSubmit() {
    this.alertService.confirm('', '¿Esta seguro que desea Guardar?').subscribe(res => {
      this.showLoader = true;
      if (res) {
        let listOptionsSelected = this.GetOptionSelected();
        if (this.formCreateProfile.controls.id.value !== null && this.formCreateProfile.controls.id.value !== undefined
          && this.formCreateProfile.controls.id.value !== '' && this.formCreateProfile.controls.id.value !== 0) {
          let updateProfileIn: UpdateProfileIn = {
            profile: this.formCreateProfile.value,
            listOption: listOptionsSelected
          }
          this.ProfileService.Update(updateProfileIn).subscribe(data => {
            if (data.result === Result.Success) {
              this.toastr.success("Se actualizo correctamente");
              this.modal.dismissAll();
              this.ProfileService.ExecuteShareEvent();
            } else {
              this.toastr.error("Ocurrio un error, por favor intente de nuevo");
              console.log(data);
            }
            this.showLoader = false;
          });
        } else {
          let addProfileIn: AddProfileIn = {
            profile: this.formCreateProfile.value,
            listOption: listOptionsSelected
          }
          this.ProfileService.Add(addProfileIn).subscribe(data => {
            if (data.result === Result.Success && data.id !== null && data.id > 0) {
              this.toastr.success("Se almaceno correctamente");
              this.modal.dismissAll();
              this.ProfileService.ExecuteShareEvent();
            } else {
              this.toastr.error("Ocurrio un error, por favor intente de nuevo");
              console.log(data);
            }
            this.showLoader = false;
          });
        }
      } else {
        this.ProfileService.ExecuteShareEvent();
      }
    });
  }
  //Funcion para obtener una lista de las opciones que se seleccionaron
  GetOptionSelected() {
    this.listOptionSelected = [];
    let mapOption = this.listMenu.map(x => x.listOption);
    mapOption.forEach(data => {
      data.forEach(itemOption => {
        this.RecursionOption(itemOption);
      });
    });

    return this.listOptionSelected;
  }
  //Funcion recursiva para recoler la una lista o una lista dentro de otra y agreagrlo a una lista 
  RecursionOption(option: Option) {
    if (option.isChecked)
      this.listOptionSelected.push(option);

    if (option.listOption) {
      option.listOption.forEach(data => {
        this.RecursionOption(data);
      });
    }
  }
  //Funcion para obtener una lista del menu de cada perfil dependiendo del id
  GetMenu() {
    if (this.ProfileModel !== undefined && this.ProfileModel !== null && this.ProfileModel.id !== 0) {
      this.filterMenuId = {
        option: null,
        profileId: this.ProfileModel.id,
        isToProfileManager: true
      }
    }
    this.OptionService.GetAllMenu(this.filterMenuId).subscribe(data => {
      if (data.result == Result.Success) {
        this.listMenu = data.listMenu;
      }
      this.showLoader = false;
    });
  }
}
