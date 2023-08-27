import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-permission-item',
  templateUrl: './permission-item.component.html',
  styleUrls: ['./permission-item.component.css']
})
export class PermissionItemComponent implements OnInit {
  /**
   * Decoradores de tipo imput item y depth
   * item : recibe un dato de tipo eny que puede recibir una lista
   * depth: recibe un dato de tipo number para definir padding-left
   */
  @Input() item: any;
  @Input() depth: any;

  constructor() { }

  ngOnInit(): void {
  }
  //Funcion que recibe un evento para determinar que opcion fue marcada
  onCheckboxChange(event) {
    this.item.isChecked = event.target.checked;
  }
}
