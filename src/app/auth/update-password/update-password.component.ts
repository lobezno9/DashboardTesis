import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/service/user.service';
import { Result } from 'src/app/shared/general/Result';
import { UpdateUserIn } from 'src/app/shared/methodparameters/User/UpdateUserIn';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  year = new Date().getFullYear()

  UpdatePasswordForm: FormGroup;
  showLoader: boolean = false;
  FilterUpdateUser: UpdateUserIn
  username: string;
  urlTree: UrlTree;
  hide = true;
  hideC = true;


  constructor(
    private usersService: UsersService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParams.Username === undefined || this.activatedRoute.snapshot.queryParams === null) {
      this.router.navigate(['/Login']);
    }
    this.urlTree = this.router.parseUrl(this.router.url);
    this.username = this.activatedRoute.snapshot.queryParams.Username;
    // this.username = this.urlTree.queryParams['Username'];
    this.CreateForm();

  }
  //FFuncion que crea el formulario para el cambio de contraseña
  CreateForm() {
    this.UpdatePasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      username: new FormControl(this.username)
    })
  }
  //Funcion que se encarga de actualizar la contraseña
  UpdatePassword() {
    this.FilterUpdateUser = new UpdateUserIn();
    if (this.UpdatePasswordForm.valid) {
      this.showLoader = true;
      this.FilterUpdateUser = {
        user: this.UpdatePasswordForm.value
      }
      if (this.UpdatePasswordForm.controls.password.value == this.UpdatePasswordForm.controls.confirmPassword.value) {

        this.usersService.UpdatePassword(this.FilterUpdateUser).subscribe(data => {
          if (data.result === Result.Success && data.isEquals === false) {
            this.showLoader = false;
            this.toastr.success("Se actualizo correctamente la contraseña");
            this.router.navigate(['/Login']);
          } else if (data.result === Result.Success && data.isEquals === true) {
            this.showLoader = false;
            this.toastr.info("Use otra contraseña");
          } else {
            this.showLoader = false;
            this.toastr.warning("No fue posible actualizar la contraseña, por favor comuniquese con el administrador.");
          }
        })
      }
      else {
        this.showLoader = false;
        this.toastr.warning("Las contraseñar no coinciden.");
      }
    }
    else {
      this.toastr.info("Todos los campos son necesarios.");
    }
  }

}
