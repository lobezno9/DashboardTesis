import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnDestroy {

  public breadcrumbs: string[];
  public TituloSub$: Subscription;

  constructor(private router: Router) {
    this.TituloSub$ = this.getArgumentosRuta()
      .subscribe(({ title }) => {
        this.breadcrumbs = location.pathname.split('/', location.pathname.length);
        this.breadcrumbs[this.breadcrumbs.length - 1] = title
        document.title = `CNueva - ${title}`
      });
  }

  ngOnDestroy(): void {
    this.TituloSub$.unsubscribe();
  }

  getArgumentosRuta() {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data),
    )
  }
}
