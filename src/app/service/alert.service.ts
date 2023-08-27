import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private dialog: MatDialog) { }
  //Funcion que ejecuta un componente que crea una ventana emergente de confirnacion
  public confirm(title: string, message: string): Observable<boolean> {

    let dialogRef: MatDialogRef<AlertComponent>;

    dialogRef = this.dialog.open(AlertComponent);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.disableClose = true;

    return dialogRef.afterClosed();
  }
}
