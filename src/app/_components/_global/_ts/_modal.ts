import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { Modal } from '../../../_class/_data.class';
import { ModalService } from '../../../_services/_app.services';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-modal',
    templateUrl: './../_html/_modal.html'
})
export class ModalComponent implements OnInit, OnDestroy {
    modal: Modal;
    private $: any;
    private isSuccessShow = false;
    private isErrorShow = false;
    public message: any;
    private subscription: Subscription;
    constructor(private _ms: ModalService) { }

    ngOnInit() {
        this.subscription = this._ms.getMessage().subscribe(modal => {
            this.show(modal);
        });
        const _self = this;
        $(function () {
            $("#hideSuccess").click(function () {
                _self.isSuccessShow = false;
            });
            $("#hideError").click(function () {
                _self.isErrorShow = false;
            })
        });
    }
    ngOnDestroy() {
        // this.subscription.unsubscribe();
    }
    private msgSuccess() {
        $("#showSuccess").trigger("click");
        let _self = this;
        setTimeout(function () {
            if (_self.isSuccessShow === true) {
                $("#hideSuccess").trigger("click");
            }
        }, 5000);
    }
    private msgError() {
        $("#showError").trigger("click");
        let _self = this;
        setTimeout(function () {
            if (_self.isErrorShow === true) {
                $("#hideError").trigger("click");
            }
        }, 5000);
    }

    get msgConfirm() {
        return
    }
    private show(modal: Modal) {
        if (!modal || !modal.type || 'undefined' === typeof (modal.type)) {
            return;
        }
        if (modal.type === 'success') {
            this.isSuccessShow = true;
            this.message = modal.message;
            this.msgSuccess();
        }
        if (modal.type === 'error') {
            this.isErrorShow = true;
            this.message = modal.message;
            this.msgError();
        }
    }

}