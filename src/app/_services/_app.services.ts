import { Injectable } from '@angular/core';
import { Config } from './_data.services';
import { HttpClient } from '@angular/common/http';
import { Data, Modal, User } from '../_class/_data.class';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class AppServices {
    public config = Config;
}
@Injectable({
    providedIn: 'root'
})
export class StudentService {
    constructor(private _app: AppServices, private http: HttpClient) { }
    read() {
        return this.http.get<Data>(`${this._app.config.base}read/students/`);
    }
    create(param: FormData) {
        return this.http.post<Data>(`${this._app.config.base}create/students/`, param);
    }
    filter(param:any) {
        return this.http.get<Data>(`${this._app.config.base}filter/students/${param.session}/${param.dpm}`);
    }
}
@Injectable({
    providedIn: 'root'
})
export class AcctInfoService {
    constructor(private _app: AppServices, private http: HttpClient) { }
    read() {
        return this.http.get<Data>(`${this._app.config.base}read/acctinfo/`);
    }
    update(param:any,id) {
        return this.http.put<Data>(`${this._app.config.base}update/acctinfo/${id}`, param);
    }
}
@Injectable({
    providedIn: 'root'
})
export class PlacementService {
    constructor(private _app: AppServices, private http: HttpClient) { }
    read() {
        return this.http.get<Data>(`${this._app.config.base}read/placement/`);
    }
    update(param:any,id) {
        return this.http.put<Data>(`${this._app.config.base}update/placement/${id}`, param);
    }
}
@Injectable({
    providedIn: 'root'
})
export class SupService {
    constructor(private _app: AppServices, private http: HttpClient) { }
    read() {
        return this.http.get<Data>(`${this._app.config.base}read/supervisors/`);
    }
    create(param:any) {
        return this.http.post<Data>(`${this._app.config.base}create/supervisors/`, param);
    }
    filter(param:any) {
        return this.http.get<Data>(`${this._app.config.base}filter/supervisors/${param.session}/${param.dpm}`);
    }
}
@Injectable({
    providedIn: 'root'
})
export class RoutesService {
    constructor(private _app: AppServices, private http: HttpClient) { }
    read() {
        return this.http.get<Data>(`${this._app.config.base}read/routes/`);
    }
    readstate() {
        return this.http.get<Data>(`${this._app.config.base}readstate/routes/`);
    }
    create(param:any) {
        return this.http.post<Data>(`${this._app.config.base}create/routes/`, param);
    }
    readlocations(state:string,dpm:string) {
        return this.http.get<Data>(`${this._app.config.base}readlocations/routes/${state}/${dpm}`);
    }
    readsuperviors(dpm:string) {
        return this.http.get<Data>(`${this._app.config.base}readsuperviors/routes/${dpm}`);
    }
    filter(param:any) {
        return this.http.get<Data>(`${this._app.config.base}filter/routes/${param.session}/${param.dpm}`);
    }
    readstudents(supid:number) {
        return this.http.get<Data>(`${this._app.config.base}students/routes/${supid}`);
    }
}
@Injectable({
    providedIn: 'root'
})
export class SessionService {
    constructor(private _app: AppServices, private http: HttpClient) { }
    read() {
        return this.http.get<Data>(`${this._app.config.base}read/acadsessions/`);
    }
    create(param:any) {
        return this.http.post<Data>(`${this._app.config.base}create/acadsessions/`, param);
    }
    setdeafult(id:any) {
        return this.http.get<Data>(`${this._app.config.base}setdeafult/acadsessions/${id}`);
    }
}
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    constructor(private _app: AppServices,private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('USER_TOKEN')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    public isLoggedIn() {
        return localStorage.getItem('USER_TOKEN') !== null;
    }
    public logout() {
        localStorage.removeItem('USER_TOKEN');
        this.currentUserSubject.next(null);
    }
    login(userInfo:any) {
        return this.http.post<Data>(`${this._app.config.base}login/users/`, userInfo).pipe(
            map((res: Data) => {
                if (res.body && 'undefined' !==typeof(res.body.token) && res.body.token !== '') {
                    localStorage.setItem('USER_TOKEN', JSON.stringify(res.body));
                    this.currentUserSubject.next(res.body);
                }
                return res;
            }));
    }
}
@Injectable({
    providedIn: 'root'
})
export class ModalService{
    private subject = new Subject<Modal>();
    private keepAfterNavigationChange = false;
    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }
    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', message: message });
    }

    error(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', message: message });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}