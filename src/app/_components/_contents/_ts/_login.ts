import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../_services/_app.services';
import { Data } from '../../../_class/_data.class';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: './../_html/_login.html'
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    isSubmitted = false;
    isMessage = false;
    errMsg: Data = new Data();
    constructor(private _as: AuthService, private _rt: Router, private _fb: FormBuilder) {
        if (this._as.currentUserValue) {
            this._rt.navigate([`/home.js`]);
        }
    }

    ngOnInit() {
        this.loginForm = this._fb.group({
            username: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new FormControl('', Validators.required)
        });
    }
    get formControls() { return this.loginForm.controls; }
    login() {
        this.isSubmitted = true;
        this.errMsg = new Data();
        this.isMessage = false;
        if (this.loginForm.invalid) {
            return;
        }
        this._as.login(this.loginForm.value).pipe(first()).subscribe((data: Data) => {
            this.isMessage = true;
            this.errMsg = data;
            if (Number(data.status) === Number(1701)) {
                this._rt.navigate(['/home.js']);
            }else{
                this.loginForm.reset();
            }
        }, (error: Data) => {
            this.isMessage = true;
            this.errMsg = error;
        });
    }
}