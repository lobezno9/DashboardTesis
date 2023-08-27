import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit {

  urlSafe: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  showLoader: boolean = true;
  CNuevaDashboardToken: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.CNuevaDashboardToken = localStorage.getItem("token");

    if (this.activatedRoute.snapshot.queryParams !== null && atob(this.activatedRoute.snapshot.queryParams.url) !== "" &&
      atob(this.activatedRoute.snapshot.queryParams.url) !== undefined && atob(this.activatedRoute.snapshot.queryParams["special"]) === '') {

      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(atob(this.activatedRoute.snapshot.queryParams.url) + '?CNuevaToken=' + this.CNuevaDashboardToken);
      this.showLoader = false;

    } else if (this.activatedRoute.snapshot.queryParams !== null && atob(this.activatedRoute.snapshot.queryParams["special"]) !== "" &&
      atob(this.activatedRoute.snapshot.queryParams["special"]) !== undefined) {

      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(atob(this.activatedRoute.snapshot.queryParams.url) + '?CNuevaToken=' + this.CNuevaDashboardToken + '&special=' + this.activatedRoute.snapshot.queryParams["special"]); 11
      this.showLoader = false;

    }
  }
}
