export class Lga { public lga: string }
export class Data {
    public status: any;
    public body: any;
    public msg?: any;
    public count?: number;
}
export class Students {
    public id: any;
    public regno: string;
    public fullname: string;
    public phone: string;
    public department: string;
}
export class AcctInfo {
    public id: any;
    public acctname: string;
    public acctno: any;
    public bankname: string;
    public sortcode: string;
}
export class Placement {
    public id: any;
    public orgname: string;
    public state: string;
    public lga: string;
    public city: string;
    public addr: string;
    public phone: string;
    public email: string;
}
export class Supervisors {
    public id: any;
    public fileno: string;
    public fullname: string;
    public phone: string;
    public department: string;
    public routes?:any;
}
export class MasterFile {
    public id: any;
    public students?: Students;
    public acctinfo?: AcctInfo;
    public placement?: Placement;
    public supervisor?: Supervisors;
    public photos?:any;
}
export class Modal{
    public type:string;
    public message:any;
}
export class Locations{
    public city:string;
    public count:number;
}
export class SupRoutes{
    public supervisor?: Supervisors;
    public routes?:Location;
}
export class SupStudents{
    public regno: string;
    public fullname: string;
    public phone: string;
    public orgname: string;
    public addr: string;
    public orgphone: string;
    public email: string;
}
export class Sessions{
    public id:any;
    public sessions:any;
    public status:any;
}
export class User{
    constructor(public userrole:string,public fullname:string, public token:string,public baseUrl:string){
    }
}