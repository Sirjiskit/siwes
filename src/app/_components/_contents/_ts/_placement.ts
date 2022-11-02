import { Component, OnInit } from '@angular/core';
import { MasterFile, Data } from '../../../_class/_data.class';
import { PaginationInstance } from 'ngx-pagination';
import { StudentService } from '../../../_services/_app.services';
import { FilterPipe } from 'ngx-filter-pipe';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    templateUrl: './../_html/_placement.html'
})
export class PlacementComponent implements OnInit {
    public MasterList: MasterFile[] = [];
    private catchData: MasterFile[] = [];
    filterForm: FormGroup;
    config: PaginationInstance = { id: 'masterid', itemsPerPage: 10, currentPage: 0 };
    constructor(private _stService: StudentService, private filter: FilterPipe, private _fb: FormBuilder) { 
        this._stService.read().subscribe((data: Data) => {
            this.MasterList = data.body;
            this.catchData = data.body;
        });
    }

    ngOnInit() { 
        this.filterForm = this._fb.group({
            session: [''],
            dpm: ['']
        });
    }
    filterRecords() {
        this._stService.filter(this.filterForm.value).subscribe((data: Data) => {
            this.MasterList = data.body;
        });
    }
    searchBox(text: any) {
        if (text === "") {
            this.MasterList = this.catchData;
        } else {
            const filterArr = {$or:[{students:{ fullname: text }},{students:{ regno: text }},
                {students:{ department: text }},{students:{ phone: text }}]};
            const newData = this.catchData;
            this.MasterList = this.filter.transform(newData, filterArr);
        }
    }
}