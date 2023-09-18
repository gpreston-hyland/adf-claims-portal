import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalValuesService {

  currentUser:string = '';
  policyBaseURL:string = 'http://ec2-18-207-201-97.compute-1.amazonaws.com:4000/policy';
  claimBaseURL:string = 'http://ec2-18-207-201-97.compute-1.amazonaws.com:4000/claim';
  appName:string = 'claims-comm-auto-mvp';
  fnolProcess:string = 'first-notice-of-loss';
  loggedIn:boolean;
}

