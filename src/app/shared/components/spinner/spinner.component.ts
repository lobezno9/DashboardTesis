import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  /**
   * Decorador que recibe un valor de tipo Boolean
   * Se utiliza para Mostrar el componente
   */
  @Input() show: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}