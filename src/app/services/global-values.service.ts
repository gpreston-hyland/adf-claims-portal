import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalValuesService {

  currentUser:string = '';
  policyBaseURL:string = 'http://ec2-18-207-201-97.compute-1.amazonaws.com:4000/policy';
  claimBaseURL:string = 'http://ec2-18-207-201-97.compute-1.amazonaws.com:4000/claim';
  
  appName:string = 'claims-test';    //'claims-comm-auto-mvp';
  fnolProcessDefinitionId = 'Process_z-vNQpyK';   //'Process_LIvxCBO2';
  fnolProcess:string = 'first-notice-of-loss';
  fnolUploadTaskName = 'upload File(s)';
  claimNumber:string = '12345';
  companyName:string = 'Ace Hardware';
  claimFolderName:string = '-root-/Sites/claims/documentLibrary/Commercial Auto/Acme/12345';
  loggedIn:boolean;
}

