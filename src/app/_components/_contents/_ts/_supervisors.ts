import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SupService, ModalService } from '../../../_services/_app.services';
import { Supervisors, Data } from '../../../_class/_data.class';
import { PaginationInstance } from 'ngx-pagination';
import { FilterPipe } from 'ngx-filter-pipe';

@Component({
    templateUrl: './../_html/_supervisors.html'
})
export class SupervisorsComponent implements OnInit {
    isSubmitted = false;
    supForm: FormGroup;
    filterForm: FormGroup;
    sup_list:Supervisors[]=[];
    private catchData:Supervisors[]=[];;
    config: PaginationInstance = { id: 'supid', itemsPerPage: 10, currentPage: 0 };
    constructor( private _fb:FormBuilder, private _sup:SupService, private filter: FilterPipe,private _ms: ModalService) {
        this._sup.read().subscribe((data:Data)=>{
            this.sup_list = data.body;
            this.catchData = data.body;
        });
     }
    ngOnInit() { 
        this.InitForms();
    }
    private InitForms(){
        this.supForm = this._fb.group({
            fileno:[''],
            fullname:[''],
            phone:[''],
            department:['']
        });
        this.filterForm = this._fb.group({
            session: [''],
            dpm: ['']
        });
    }
    filterRecords() {
        this._sup.filter(this.filterForm.value).subscribe((data: Data) => {
            this.sup_list = data.body;
            this.catchData = data.body;
        });
    }
    get formControls(){
        return this.supForm.controls;
    }
    AddSup(){
        this.isSubmitted = true;
        if(this.supForm.valid ===false){
            return
        }
        this._sup.create(this.supForm.value).subscribe((data: Data) => {
            if (data.status === 1701) {
                this._ms.success(data.msg, true);
                this.sup_list.push(data.body);
                this.isSubmitted = false;
                this.supForm.reset();
            } else {
                this._ms.error(data.msg, true);
            }
        }, (arror: Data) => {
            this._ms.error(arror.msg, true);
        });
    }
    searchBox(text: any) {
        if (text === "") {
            this.sup_list = this.catchData;
        } else {
            const filterArr = {$or:[{ fullname: text },{ fileno: text },{ department: text },{ phone: text }]};
            const newData = this.catchData;
            this.sup_list = this.filter.transform(newData, filterArr);
        }
    }
}