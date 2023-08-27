import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavService } from 'src/app/service/nav.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class SidebarComponent implements OnInit {
  /**
   * Decoradores item y depth de tipo any
   * Item->recibe una lista de Opciones para crear el menu
   * Depth->ricibe un numero el cual determina el nivel del menu
   */
  @Input() item: any;
  @Input() depth: any;
  expanded: boolean = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;

  constructor(
    public router: Router,
    public navService: NavService,
    private toastr: ToastrService
  ) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.url && url) {
        // console.log(`Checking '/${this.item.route}' against '${url}'`);
        this.expanded = url.indexOf(`/${this.item.url}`) === 0;
        this.ariaExpanded = this.expanded;
        // console.log(`${this.item.route} is expanded: ${this.expanded}`);
      }
    });
  }
  //Funcion para redireccionar al componente o a la url de manera dinamica
  onItemSelected(item: any, $event) {
    if (document.querySelector('.c-active')) {
      document.querySelector('.c-active').classList.remove('c-active');
      if (document.querySelector('.c-active')) {
        document.querySelector('.c-active').classList.remove('c-active');
      }
    }
    if ((!item.listOption || item.listOption.length == 0) && item.url !== null && item.url !== "") {
      item.isActive = true;
      $event.target.classList.add('c-active');

      let navigationExtras: NavigationExtras = {
        queryParams: {
          special: item.listPermission.length > 0 ? btoa(JSON.stringify(item.listPermission)) : '',
          url: btoa(item.url),
        }
      };
      if (item.url.includes('http')) {
        var currentUrl = this.router.url;
        if (currentUrl.search("Dynamic") !== -1) {

          this.router.navigate(['/Administration/IFrame', navigationExtras]);
          this.router.navigate(['/Administration/IFrame'], navigationExtras);

        } else {

          this.router.navigate(['/Administration/Dynamic', navigationExtras]);
          this.router.navigate(['/Administration/Dynamic'], navigationExtras);

        }
        this.navService.closeNav();
      }
      // else if (item.url.includes('http')) {
      //   this.toastr.warning("Esa URL no es segura")
      //   this.navService.closeNav();
      // }
      else {

        this.router.navigate([item.url], navigationExtras);
        this.navService.closeNav();
      }
    }
    else if (item.listOption && item.listOption.length) {
      this.expanded = !this.expanded;
    }
  }
}