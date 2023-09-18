import { Component,OnInit } from '@angular/core';

import {AuthenticationService} from '@alfresco/adf-core'
import {GlobalValuesService} from '../services/global-values.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  // userName:string;
  // isLoggedOn:boolean;

  constructor(public globalValues:GlobalValuesService, private authService:AuthenticationService){
    // this.userName = this.globalValues.currentUser;
    // this.isLoggedOn = this.globalValues.loggedIn;
    console.log("************** Home Component Constructor");
  }

  ngOnInit(): void {
    this.globalValues.loggedIn = this.authService.isLoggedIn();
    this.globalValues.currentUser = this.authService.getEcmUsername();
      
  }

}
