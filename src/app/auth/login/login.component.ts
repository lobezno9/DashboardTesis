import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { Result } from 'src/app/shared/general/Result';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //Variables del formulario
  year = new Date().getFullYear()
  loginForm: FormGroup;
  showLoader: boolean = false;
  closeResult: string;
  backgroundUrl: string;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    localStorage.clear();
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      platform: (1)
    });
  }
  //Funcion que ejecuta un servicio para la autenticacion y determina si necesita cambio de contraseña o esta inactivo el usuario
  login(content) {
    if (this.loginForm.valid) {
      this.showLoader = true;
      this.authService.Login(this.loginForm.value).subscribe(data => {
        // console.log(data, 'Token');
        if (data.result == Result.Success && data.isAuthetnicated && data.isActive && data.changePassword) {

          this.OpenModalRecoverPassword(content);
          this.toastr.info("Necesita Cambio de Contraseña");
          this.showLoader = false;

        }
        else if (data.result == Result.Success && data.isAuthetnicated && data.isActive && !data.changePassword && data.token !== "") {

          localStorage.setItem("token", data.token);
          this.showLoader = false;
          this.router.navigate(['/Administration/Home']);

        }
        else if (data.result == Result.Success && data.isAuthetnicated && !data.isActive) {

          this.toastr.info("Usuario desactivado");
          this.showLoader = false;

        }
        else if (data.result == Result.Success && !data.isAuthetnicated && !data.isActive && !data.changePassword) {

          this.toastr.warning("Credenciales incorrectas");
          this.showLoader = false;

        }
        else {

          this.toastr.error("Ocurrio un error, por favor intente de nuevo");
          this.showLoader = false;

        }
      });
    }
  }
  //Funcion encargadad de definir y abir la modal
  OpenModalRecoverPassword(content) {
    this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  //Funcion encargada de cerrar la modal
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
