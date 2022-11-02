import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { MasterFile, Data } from '../../../_class/_data.class';
import { PaginationInstance } from 'ngx-pagination';
import { StudentService } from '../../../_services/_app.services';
declare var $:any;
@Component({
  templateUrl: './../_html/_home.html'
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  public MasterList: MasterFile[] = [];
  config: PaginationInstance = { id: 'masterid', itemsPerPage: 12, currentPage: 0 };
  constructor(private _stService: StudentService) {
    this._stService.read().subscribe((data: Data) => {
      this.MasterList = data.body;
    });
  }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.includeScripts();
  }
  ngOnDestroy() {
    this.excludeScripts();
  }
  private includeScripts(): void {
    const node = document.createElement('script');
    node.src = '../assets/js/masonery.js';
    node.type = 'text/javascript';
    node.async = false;
    node.id = 'Script';
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
  private excludeScripts(): void {
    const script = $('#Script').attr('src');
    if ('undefined' !== typeof script) {
      $('#Script').remove();
    }
  }
}
