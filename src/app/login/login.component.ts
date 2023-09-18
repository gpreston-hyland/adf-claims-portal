import { Component } from '@angular/core';
import {AuthenticationService} from '@alfresco/adf-core';
// import {GlobalValuesService} from '../services/global-values.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  //loggedIn: boolean = false;

  // constructor(private globalValues:GlobalValuesService, private authService:AuthenticationService) {

  // }
  onLogonSuccess($event) {
    console.debug("******************* logged in:"+$event  );
  //   this.globalValues.loggedIn = true;
  //   this.globalValues.currentUser = this.authService.getEcmUsername();
  }

}
