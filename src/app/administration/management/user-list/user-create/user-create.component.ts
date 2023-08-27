import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { GroupService } from 'src/app/service/group.service';
import { ProfileService } from 'src/app/service/profile.service';
import { UsersService } from 'src/app/service/user.service';
import { UserTypeService } from 'src/app/service/userType.service';
import { Result } from 'src/app/shared/general/Result';
import { GetGroupIn } from 'src/app/shared/methodparameters/Group/GetGroupIn';
import { GetAllProfileIn } from 'src/app/shared/methodparameters/Profile/GetAllProfileIn';
import { AddUserIn } from 'src/app/shared/methodparameters/User/AddUserIn';
import { GetUserTypeIn } from 'src/app/shared/methodparameters/UserType/GetUserTypeIn';
import { Group } from 'src/app/shared/models/Group';
import { Profile } from 'src/app/shared/models/Profile';
import { User } from 'src/app/shared/models/User';
import { UserType } from 'src/app/shared/models/UserType';
import { map, startWith } from 'rxjs/operators';
import { AlertService } from 'src/app/service/alert.service';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  //Decorador de tipo Input que recibe un objeto de tipo User
  @Input() UserModel: User;
  //Variables del Formulario
  formCreateUser: FormGroup;
  showLoader: boolean = true;
  filterProfile: GetAllProfileIn;
  filterGroup: GetGroupIn;
  filterUserType: GetUserTypeIn;
  ListProfile: Profile[];
  ListGroup: Group[];
  ListUserType: UserType[];

  constructor(
    private toastr: ToastrService,
    private modal: NgbModal,
    private UserService: UsersService,
    private ProfileService: ProfileService,
    private GroupService: GroupService,
    private UserTypeService: UserTypeService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.GetProfiles();
    this.GetGroups();
    this.GetUserType();
    this.showLoader = false;
    if (this.UserModel !== undefined && this.UserModel !== null) {
      this.CreateFormEdit(this.UserModel)
    }
    else {
      this.CreateFrom();
    }
  }
  //Funcion que crea el formulario para crear usuarios
  CreateFrom() {
    this.formCreateUser = new FormGroup({
      id: new FormControl(0, Validators.required),
      username: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
      firstName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(2), Validators.maxLength(100)]),
      profile: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      isActive: new FormControl(true, [Validators.required]),
      identification: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
      GroupId: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      UserTypeId: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    })
  }
  //Funcion que crea el formulario para editar los usuarios
  CreateFormEdit(itemUser: User) {
    this.formCreateUser = new FormGroup({
      id: new FormControl(itemUser.id, Validators.required),
      username: new FormControl(itemUser.username, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      password: new FormControl(null),
      firstName: new FormControl(itemUser.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      lastName: new FormControl(itemUser.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      email: new FormControl(itemUser.email, [Validators.required, Validators.email, Validators.minLength(2), Validators.maxLength(100)]),
      profile: new FormControl(itemUser.profile, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      isActive: new FormControl(itemUser.isActive),
      identification: new FormControl(itemUser.identification, Validators.required),
      GroupId: new FormControl(itemUser.groupId, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      UserTypeId: new FormControl(itemUser.userTypeId, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    })
  }
  //Funcion que usa un servicio para crear o editar un usurio
  OnSubmit() {
    this.alertService.confirm('', '¿Esta seguro que desea Guardar?').subscribe(res => {
      if (res) {
        let addUserIn: AddUserIn = {
          user: this.formCreateUser.value
        };
        if (this.formCreateUser.controls.id.value !== null && this.formCreateUser.controls.id.value !== undefined
          && this.formCreateUser.controls.id.value !== 0) {
          this.UserService.Update(addUserIn).subscribe(data => {
            if (data.result === Result.Success) {
              this.toastr.success("Se actualizo correctamente");
              this.modal.dismissAll();
              this.UserService.ExecuteShareEvent();
            } else {
              this.toastr.error("Ocurrio un error, por favor intente de nuevo");
              console.log(data);
            }
          });
        } else {
          this.UserService.Add(addUserIn).subscribe(data => {
            if (data.result === Result.Success && data.id !== null && data.id > 0) {
              this.toastr.success("Se almaceno correctamente");
              this.modal.dismissAll();
              this.UserService.ExecuteShareEvent();
            } else {
              this.toastr.error("Ocurrio un error, por favor intente de nuevo");
              console.log(data);
            }
          });
        }
      } else {
        this.UserService.ExecuteShareEvent();
      }
    });
  }


  filteredProfile: Observable<Profile[]>;
  //Funcion para obtener una lista de perfiles
  GetProfiles() {
    this.filterProfile = { profile: null };
    this.ProfileService.GetAll(this.filterProfile).subscribe(data => {
      if (data.result === Result.Success) {
        this.ListProfile = data.listProfile
        // Parte para hacer autocompletado
        this.filteredProfile = this.formCreateUser.controls.profile.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.ListProfile.slice())
          );
      }
    })
  }
  //Funcion que asigna el valor de control de una opción a su valor de visualización en el disparador
  displayFn(user: Profile): string {
    return user && user.description ? user.description : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.ListProfile.filter(option => option.description.toLowerCase().indexOf(filterValue) === 0);
  }
  //Funcion que obtiene un alista de grupos
  GetGroups() {
    this.filterGroup = { group: null };
    this.GroupService.GetAll(this.filterGroup).subscribe(data => {
      if (data.result === Result.Success) {
        this.ListGroup = data.listGroup
      }
    })
  }
  //Funcion que obtiene una lista de Tipos de usuarios
  GetUserType() {
    this.filterUserType = { userType: null };
    this.UserTypeService.GetAll(this.filterUserType).subscribe(data => {
      if (data.result === Result.Success) {
        this.ListUserType = data.listUserType
      }
    })
  }

}
