import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalValuesService {


  ct_testGatewaysId:string = 'Process_z-vNQpyK';
  ct_AppName = 'claims-test';

  mvp_AppName = 'claims-comm-auto-mvp';
  mvp_genClaimStructureId = "Process_TU4VxY8T";
  mvp_fnolId = "Process_LIvxCBO2";

  currentUser:string = '';
  // policyBaseURL:string = 'http://ec2-18-207-201-97.compute-1.amazonaws.com:4000/policy';
  // claimBaseURL:string = 'http://ec2-18-207-201-97.compute-1.amazonaws.com:4000/claim';
  
  appName:string = 'claims-test';    //'claims-comm-auto-mvp';
  fnolProcessDefinitionId = 'Process_z-vNQpyK';   
  fnolProcess:string = 'first-notice-of-loss';
  fnolUploadTaskName = 'upload File(s)';
  claimNumber:string = '';
  companyName:string = 'Ace Hardware';
  claimFolderName:string = '-root-/Sites/claims/documentLibrary/Commercial Auto/Acme/12345';
  loggedIn:boolean;
  apaBaseURL:string = "https://sse-apa.dev.alfrescocloud.com";
}

