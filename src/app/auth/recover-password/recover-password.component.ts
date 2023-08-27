import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { Result } from 'src/app/shared/general/Result';
import { ValidateRecoverPasswordIn } from 'src/app/shared/methodparameters/Login/ValidateRecoverPasswordIn';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  formRecover: FormGroup;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.CreateForm();
  }
  //Funcion que crea el formulario para recuperar la contraseña
  CreateForm() {
    this.formRecover = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }
  //Fincion que envia el formulario de recuperacion de contraseña
  OnSubmit() {
    let recoverPasswordIn: ValidateRecoverPasswordIn = { validateRecoverPassword: this.formRecover.value }
    this.authService.RecoverPassword(recoverPasswordIn).subscribe(data => {
      if (data.result == Result.Success) {
        this.toastr.success("Se ha enviado un correo ");
        this.modalService.dismissAll();
      } else {
        this.toastr.warning("Credenciales Incorrectas");
      }
    })
  }
}
