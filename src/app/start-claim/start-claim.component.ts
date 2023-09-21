import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {Observable} from 'rxjs';

import {GlobalValuesService} from '../services/global-values.service';
import { ProcessInstanceCloud, ProcessPayloadCloud, StartProcessCloudService} from '@alfresco/adf-process-services-cloud';

@Component({
  selector: 'app-start-claim',
  templateUrl: './start-claim.component.html',
  styleUrls: ['./start-claim.component.scss']
})
export class StartClaimComponent implements OnInit {

  bStartProcess: boolean = false;
  bShowResults: boolean = false;
  bShowTaskForm: boolean = false;
  isLoading: boolean = true;
  formTaskId: String;

  results:any ;

  constructor(public globalValues:GlobalValuesService
      , private _router:Router
      ,private _startProcCloud:StartProcessCloudService
    ) {    console.log('******************************* startclaimcomponent-constructor'); }

  ngOnInit(): void {
    console.log('******************************* startclaimcomponent-ngOnInit');
    //Start new process
    this.isLoading = true;
    this.startNewClaimProcess();

  }

  startNewClaimProcess() {
    console.debug("********* enter startNewClaimProcess()");

    var _payload: ProcessPayloadCloud;
    
    _payload = new ProcessPayloadCloud(); 
    //Process_z-vNQpyK:42:cdb9bb1b-5885-11ee-86f3-7ab301120a4c
   _payload.processDefinitionKey = 'Process_z-vNQpyK'; //this.globalValues.fnolProcess;
   _payload.name = 'FNOL-Service-1'; //Build unique name
   _payload.variables = {claimId:"12345", companyName:"Ace Hardware", claimFolderName:"-root-/Sites/claims/documentLibrary/Commercial Auto/Acme/12345"};
   _payload.payloadType = 'StartProcessPayload';
//    this._startProcCloud.startProcess(this.globalValues.appName,_payload).subscribe((task:ProcessInstanceCloud) => {
    this._startProcCloud.startProcess('claims-test',_payload).subscribe((task:ProcessInstanceCloud) => {
        this.isLoading = false;
        console.log(task);
        this.formTaskId = task.id;
        this.results = JSON.stringify(task);
        this.bShowTaskForm = true;
      },
      error =>{ 
        console.error("-------------- *************** Error starting proc with cloud service");
        this.isLoading = false;
        this.results = 'Error starting proc';
        this.bShowResults = true;
        }
    );

    
  }


  taskFormCompleted() {
    this.bShowTaskForm = false;
  }
  
  taskFormCancel() {
    this.bShowTaskForm = false;
  }

  taskFormError(event: any) {
    console.error("************ Task Form ERROR: " + event);
    this.bShowTaskForm = false; 
    this.results = JSON.stringify(event);
    this.bShowResults = true;
  }


  // processCancel() {
  //   this.bStartProcess = false;
    
  //   this.results = 'Process Cancelled by User';
  //   this.bShowResults = true;

  //   // this._router.navigateByUrl('/home');

  // }
  // processSuccess(event: ProcessInstanceCloud) {
  //   console.log(event);
  //   this.bStartProcess = false;

  //   this.results = JSON.stringify(event,null,2);

  //   this.bShowResults = true;
  //   // this._router.navigateByUrl('/home')
  // }
}
