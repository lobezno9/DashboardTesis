import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() title: string;
  @Input() message: string = 'Sin Mensaje';

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>
  ) { }

  ngOnInit(): void {
  }

}
