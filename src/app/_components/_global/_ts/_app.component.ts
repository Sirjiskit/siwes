import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CustomService } from '../../../_services/_custom.services';
import { Spinkit } from 'ng-http-loader';
@Component({
  selector: 'app-root',
  templateUrl: './../_html/_app.component.html'
})
export class AppComponent implements OnInit {
  spinner;
  constructor(private _router: Router, private cs:CustomService) { 
  this.spinner = Spinkit.skDoubleBounce;
  }
  ngOnInit() {
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this._router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this._router.navigated = false;
        this.cs.initJS();
        window.scrollTo(0, 0);
      }
    });
  }
}
