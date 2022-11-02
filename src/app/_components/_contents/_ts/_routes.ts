import { Component, OnInit, OnDestroy } from '@angular/core';
import { Supervisors, Locations, Data, SupRoutes, SupStudents } from '../../../_class/_data.class';
import * as $ from 'jquery';
import { RoutesService, ModalService } from '../../../_services/_app.services';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilterPipe } from 'ngx-filter-pipe';
import { PaginationInstance } from 'ngx-pagination';
@Component({
    templateUrl: './../_html/_routes.html'
})
export class RoutesComponent implements OnInit,OnDestroy {
    $: any;
    supervisors: Supervisors[] = [];
    placement = Array();
    cities: Locations[] = [];
    routes_list: SupRoutes[] = [];
    private catchData: SupRoutes[] = [];
    private dpm: any;
    routesForm: FormGroup;
    filterForm: FormGroup;
    substudents: SupStudents[] = [];
    supname:string;
    supdpm:string;
    config: PaginationInstance = { id: 'routesid', itemsPerPage: 10, currentPage: 0 };
    constructor(private _rs: RoutesService, private _fb: FormBuilder, private filter: FilterPipe, private _ms: ModalService) {
        this._rs.read().subscribe((data: Data) => {
            this.routes_list = data.body;
            this.catchData = data.body;
        });
    }
    ngOnInit() {
        this.routesForm = this._fb.group({
            dpm: [''],
            supid: [''],
            state: [''],
            city: [''],
            no: ['']
        });
        this.filterForm = this._fb.group({
            session: [''],
            dpm: ['']
        });
        this.includeScripts();
    }
    ngOnDestroy(){
        this.excludeScripts();
    }
    get formControls() {
        return this.routesForm.controls;
    }
    selectDepartment(dpm: any) {
        this.dpm = dpm;
        this._rs.readsuperviors(dpm).subscribe((data: Data) => {
            this.supervisors = data.body;
            this.cities = [];
            this._rs.readstate().subscribe((data: Data) => {
                this.placement = data.body;
            });
        })
    }
    selectLocation(loc: any) {
        this._rs.readlocations(loc, this.dpm).subscribe((data: Data) => {
            this.cities = data.body;
        })
    }
    choiceAll(index: number) {
        $("#no" + index).val(this.cities[index].count);
    }
    numbers(num: number, index: number) {
        if (num > this.cities[index].count) {
            $("#no" + index).val('');
        }
    }
    submit() {
        if (this.routesForm.valid === false) {
            this._ms.error("Please Complete routes options", true);
            return;
        }
        let city = [], count = [];
        this.formControls.city.setValue(city);
        this.formControls.no.setValue(count);
        for (let i = 0; i < this.cities.length; i++) {
            city.push($("#city" + i).val());
            count.push($("#no" + i).val());
        }
        this.formControls.city.setValue(city);
        this.formControls.no.setValue(count);
        this._rs.create(this.routesForm.value).subscribe((rs: Data) => {
            if (rs.status === 1701) {
                this._ms.success(rs.msg, true);
                this.routes_list = rs.body;
                this.routesForm.reset();
                let city = [], count = [];
                this.formControls.city.setValue(city);
                this.formControls.no.setValue(count);
                this.cities = [];
                $("#routesid").trigger("reset");
            } else {
                this._ms.error(rs.msg, true);
            }
        }, (arror: Data) => {
            this._ms.error(arror.msg, true);
        });
    }
    searchBox(text: any) {
        if (text === "") {
            this.routes_list = this.catchData;
        } else {
            const filterArr = {
                $or: [{ supervisor: { fullname: text } }, { supervisor: { fileno: text } },
                { supervisor: { department: text } }, { routes: { city: text } }]
            };
            const newData = this.catchData;
            this.routes_list = this.filter.transform(newData, filterArr);
        }
    }
    reset() {
        this.routesForm.reset();
        let city = [], count = [];
        this.formControls.city.setValue(city);
        this.formControls.no.setValue(count);
        this.cities = [];
        $("#routesid").trigger("reset");
    }
    filterRecords() {
        this._rs.filter(this.filterForm.value).subscribe((data: Data) => {
            this.routes_list = data.body;
            this.catchData = data.body;
        });
    }
    viewDetails(index: number) {
        const supid = this.routes_list[index].supervisor.id;
        this.supname = `${this.routes_list[index].supervisor.fileno} > ${this.routes_list[index].supervisor.fullname}`;
        this.supdpm = `${this.routes_list[index].supervisor.department}`;
        this._rs.readstudents(supid).subscribe((data: Data) => {
            this.substudents = data.body;
        });
    }
    print() {
        var today = new Date();
    }
    private includeScripts(): void {
        const node = document.createElement('script');
        node.src = '../assets/js/print.js';
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