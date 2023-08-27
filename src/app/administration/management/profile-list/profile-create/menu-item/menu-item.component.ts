import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  /**
   * Decoradores de tipo imput item y depth
   * item : recibe un dato de tipo eny que puede recibir una lista
   * depth: recibe un dato de tipo number para definir padding-left
   */
  @Input() item: any;
  @Input() depth: number;

  constructor() { }

  ngOnInit(): void {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }
  //Funcion que recibe un evento para determinar que opcion fue marcada
  onCheckboxChange(event) {
    this.item.isChecked = event.target.checked;
  }

}
