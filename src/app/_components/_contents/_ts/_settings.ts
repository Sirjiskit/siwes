import { Component, OnInit } from '@angular/core';
import { ModalService, SessionService } from '../../../_services/_app.services';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Sessions, Data } from '../../../_class/_data.class';
import { FilterPipe } from 'ngx-filter-pipe';

@Component({
    templateUrl: './../_html/_settings.html'
})
export class SettingsComponent implements OnInit {
    sList: Sessions[] = [];
    defaultSession: any;
    sForm: FormGroup;
    isSubmitted = false;
    constructor(private _ms: ModalService, private _fb: FormBuilder, private _ss: SessionService,
        private _filter: FilterPipe) {
        this._ss.read().subscribe((data: Data) => {
            this.sList = data.body;
            const filterItem: Sessions[] = this._filter.transform(data.body, { status: 1 });
            if (filterItem.length > 0) {
                this.defaultSession = filterItem[0].sessions;
            }
        });
    }
    ngOnInit() {
        this.sForm = this._fb.group({
            sessions: new FormControl('')
        });
    }
    get formControls() {
        return this.sForm.controls;
    }
    addSession() {
        this.isSubmitted = true;
        if (this.sForm.valid === false) {
            return;
        }
        this._ss.create(this.sForm.value).subscribe((data: Data) => {
            if (data.status === 1701) {
                this.sList.push(data.body);
                this._ms.success(data.msg, true);
                this.sForm.reset();
                this.isSubmitted = false;
            } else {
                this._ms.error(data.msg, true);
            }
        }, (error: Data) => {
            this._ms.error(error.msg, true);
        })
    }
    setDefault(id: number) {
        this._ss.setdeafult(id).subscribe((data: Data) => {
            if (data.status === 1701) {
                this.sList = data.body;
                this._ms.success(data.msg, true);
                const filterItem: Sessions[] = this._filter.transform(data.body, { status: 1 });
                if (filterItem.length > 0) {
                    this.defaultSession = filterItem[0].sessions;
                }
            } else {
                this._ms.error(data.msg, true);
            }
        }, (error: Data) => {
            this._ms.error(error.msg, true);
        });
    }
}