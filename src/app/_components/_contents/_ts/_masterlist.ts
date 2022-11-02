import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../_services/_data.services';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MasterFile, Data, AcctInfo } from '../../../_class/_data.class';
import { StudentService, ModalService, AcctInfoService, PlacementService } from '../../../_services/_app.services';
import { FilterPipe } from 'ngx-filter-pipe';
import { PaginationInstance } from 'ngx-pagination';
import * as $ from 'jquery';
@Component({
    templateUrl: './../_html/_masterlist.html'
})
export class MasterListComponent implements OnInit {
    $: any;
    lgalist = new Array();
    studentForm: FormGroup;
    acctForm: FormGroup;
    placementForm: FormGroup;
    filterForm: FormGroup;
    isSubmitted = false;
    isAcctSubmited = false;
    isPlacementSubmitted = false;
    invalidfile = false;
    selectedImage: any = false;
    private rowIndex: number;
    public singleItem = new MasterFile();
    public MasterList: MasterFile[] = [];
    private catchData: MasterFile[] = [];
    config: PaginationInstance = { id: 'masterid', itemsPerPage: 10, currentPage: 0 };
    constructor(private _ds: DataService, private _fb: FormBuilder, private _stService: StudentService,
        private _ms: ModalService, private _acct: AcctInfoService, private _ps: PlacementService, private filter: FilterPipe) {
        this._stService.read().subscribe((data: Data) => {
            this.MasterList = data.body;
            this.catchData = data.body;
        });
    }
    ngOnInit() {
        this.InitForms();
    }
    onStateSelectChange(state) {
        this.lgalist = this._ds.lga(state);
    }
    private InitForms() {
        this.studentForm = this._fb.group({
            regno: [''],
            fullname: [''],
            phone: [''],
            department: [''],
            photos: ['']
        });

        this.placementForm = this._fb.group({
            org: [''],
            state: [''],
            lga: [''],
            city: [''],
            addr: [''],
            phone: [''],
            email: ['']
        });
        this.filterForm = this._fb.group({
            session: [''],
            dpm: ['']
        })
        this.acctForm = this._fb.group({
            acctname: new FormControl(''),
            acctno: new FormControl(''),
            bankname: new FormControl(''),
            sortcode: new FormControl('')
        });
    }
    get formControls() {
        return this.studentForm.controls;
    }
    get acctControls() {
        return this.acctForm.controls;
    }
    get placementControls() {
        return this.placementForm.controls;
    }
    AddStudent() {
        this.isSubmitted = true;
        if (this.studentForm.valid === false || this.invalidfile === true) {
            return
        }
        this._stService.create(this.studFormData(this.studentForm.value)).subscribe((data: Data) => {
            if (data.status === 1701) {
                this._ms.success(data.msg, true);
                this.MasterList.push(data.body);
                this.isSubmitted = false;
                this.studentForm.reset();
            } else {
                this._ms.error(data.msg, true);
            }
        }, (arror: Data) => {
            this._ms.error(arror.msg, true);
        });
    }
    addAcct(rowIndex: number) {
        this.rowIndex = rowIndex;
        let itemsaccts: AcctInfo = new AcctInfo();
        this.singleItem = this.MasterList[this.rowIndex];
        itemsaccts = this.singleItem.acctinfo;
        this.acctControls.acctname.setValue(this.singleItem.students.fullname);
        this.acctControls.acctno.setValue(itemsaccts.acctno);
        //this.acctControls.banckname.setValue(itemsaccts.bankname);
        this.acctControls.sortcode.setValue(itemsaccts.sortcode);
    }
    updateAcct() {
        this.isAcctSubmited = true;
        if (this.acctForm.valid === false) {
            return
        }
        const id = this.MasterList[this.rowIndex].id;
        this._acct.update(this.acctForm.value, id).subscribe((data: Data) => {
            if (data.status === 1701) {
                this._ms.success(data.msg, true);
                this.MasterList[this.rowIndex].acctinfo = data.body;
                this.isAcctSubmited = false;
            } else {
                this._ms.error(data.msg, true);
            }
        }, (arror: Data) => {
            this._ms.error(arror.msg, true);
        });
    }
    addPlacement(rowIndex: number) {
        this.rowIndex = rowIndex;
        this.singleItem = this.MasterList[this.rowIndex];
        this.placementControls.org.setValue(this.singleItem.placement.orgname);
        // this.placementControls.state.setValue(this.singleItem.placement.state);
        // this.placementControls.lga.setValue(this.singleItem.placement.lga);
        this.placementControls.city.setValue(this.singleItem.placement.city);
        this.placementControls.addr.setValue(this.singleItem.placement.addr);
        this.placementControls.phone.setValue(this.singleItem.placement.phone);
        this.placementControls.email.setValue(this.singleItem.placement.email);
    }
    viewDetails(rowIndex: number) {
        this.rowIndex = rowIndex;
        this.singleItem = this.MasterList[this.rowIndex];
    }
    updatePlacement() {
        this.isPlacementSubmitted = true;
        if (this.placementForm.valid == false) {
            return
        }
        const id = this.MasterList[this.rowIndex].id;
        this._ps.update(this.placementForm.value, id).subscribe((data: Data) => {
            if (data.status === 1701) {
                this._ms.success(data.msg, true);
                this.MasterList[this.rowIndex].placement = data.body;
                this.isPlacementSubmitted = false;
            } else {
                this._ms.error(data.msg, true);
            }
        }, (arror: Data) => {
            this._ms.error(arror.msg, true);
        });
    }
    private studFormData(data: any): FormData {
        let fd = new FormData();
        fd.append('regno', data.regno);
        fd.append('name', data.fullname);
        fd.append('phone', data.phone);
        fd.append('dpm', data.department);
        fd.append('photos', this.selectedImage);
        return fd;
    }
    filterRecords() {
        this._stService.filter(this.filterForm.value).subscribe((data: Data) => {
            this.MasterList = data.body;
            this.catchData = data.body;
        });
    }
    change(event) {
        const fileList: FileList = event.target.files;
        let file: File;
        if (fileList.length > 0) {
            file = fileList[0];
        }
        const type: Array<string> = ['image/jpg', 'image/png', 'image/jpeg'];
        if (type.indexOf(file.type) < +1) {
            this.invalidfile = true;
            this.selectedImage = file;
            return false;
        } else {
            this.invalidfile = false;
            this.selectedImage = file;
        }
    }
    searchBox(text: any) {
        if (text === "") {
            this.MasterList = this.catchData;
        } else {
            const filterArr = {
                $or: [{ students: { fullname: text } }, { students: { regno: text } },
                { students: { department: text } }, { students: { phone: text } }]
            };
            const newData = this.catchData;
            this.MasterList = this.filter.transform(newData, filterArr);
        }
    }
}
