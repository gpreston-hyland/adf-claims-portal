import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class GlobalValuesService {

  ct_AppName = "claims-test";
  ct_uploadTaskId:string = "Process_z-vNQpyK";
  ct_uploadTaskName = "upload File(s)";

  mvp_AppName = "claims-comm-auto-mvp";
  mvp_genClaimStructureId = "Process_TU4VxY8T";
  mvp_fnolId = "Process_LIvxCBO2";
  mvp_uploadTaskName = "Upload Documents";

  currentUser:string = "";
  // policyBaseURL:string = "http://ec2-18-207-201-97.compute-1.amazonaws.com:4000/policy";
  // claimBaseURL:string = "http://ec2-18-207-201-97.compute-1.amazonaws.com:4000/claim";
  
  appName:string = this.mvp_AppName;
  fnolProcessDefinitionId = this.mvp_fnolId;
  fnolProcess:string = "first-notice-of-loss";
  genClaimStructureId = this.mvp_genClaimStructureId
  //fnolUploadTaskName = this.ct_uploadTaskName;
  fnolUploadTaskName = this.mvp_uploadTaskName;
  claimNumber:string = "";
  companyName:string = "GP LLC";
  claimFolderName:string = "";
  loggedIn:boolean;
  apaBaseURL:string = "https://sse-apa.dev.alfrescocloud.com";
}

