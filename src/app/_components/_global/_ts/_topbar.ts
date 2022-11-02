import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../_services/_app.services';

@Component({
    selector: 'app-topbar',
    templateUrl: './../_html/_topbar.html'
})
export class TopBarComponent implements OnInit {

    constructor(private authService: AuthService) { }

    ngOnInit() { 

    }
    Logout(){
        this.authService.logout();
        location.reload(true);
    }
    noneClickLink(){
        return;
    }
}