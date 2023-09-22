import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {map} from 'rxjs/operators';

import {GlobalValuesService} from '../services/global-values.service';

import { ProcessInstanceCloud, ProcessPayloadCloud, StartProcessCloudService,
         TaskListCloudService,
         TaskQueryCloudRequestModel} from '@alfresco/adf-process-services-cloud';
import { timer } from 'rxjs';

@Component({
  selector: 'app-start-claim',
  templateUrl: './start-claim.component.html',
  styleUrls: ['./start-claim.component.scss']
})
export class StartClaimComponent implements OnInit {

  bStartProcess: boolean = false;
  bShowResults: boolean = false;
  bShowTaskForm: boolean = false;
  bIsLoading: boolean = true;
  processId: string;
  formTaskId: string;

  results:any ;

  constructor(public globalValues:GlobalValuesService
      , private _router:Router
      ,private _startProcCloud:StartProcessCloudService
      ,private _taskListCloudService:TaskListCloudService
    ) {    console.log('******************************* startclaimcomponent-constructor'); }

  ngOnInit(): void {
    console.log('******************************* startclaimcomponent-ngOnInit');
    //Start new process
    this.bIsLoading = true;
    this.startNewClaimProcess();

  }

  // ***********************************************************
  //  Claim Process functions
  // ***********************************************************

  startNewClaimProcess() {
    console.debug("********* enter startNewClaimProcess()");

    var _payload: ProcessPayloadCloud = new ProcessPayloadCloud();
    
    // TODO: call create claim folder process
    // see https://stackoverflow.com/questions/22125865/how-to-wait-until-a-predicate-condition-becomes-true-in-javascript
    // to monitor for task completion before moving on


    // _payload = new ProcessPayloadCloud(); 
    //Process_z-vNQpyK:42:cdb9bb1b-5885-11ee-86f3-7ab301120a4c
   _payload.processDefinitionKey = this.globalValues.fnolProcessDefinitionId;
   _payload.name = this.globalValues.fnolProcess.concat("-",this.globalValues.currentUser,"-",this.globalValues.claimNumber);    //'FNOL-Service-1'; //Build unique name
   _payload.variables = {//claimId:this.globalValues.claimNumber,
     companyName:this.globalValues.companyName, 
     claimFolderName:this.globalValues.claimFolderName};
   _payload.payloadType = 'StartProcessPayload';
//    this._startProcCloud.startProcess(this.globalValues.appName,_payload).subscribe((task:ProcessInstanceCloud) => {
    this._startProcCloud.startProcess(this.globalValues.appName,_payload).subscribe((task:ProcessInstanceCloud) => {
        // this.bIsLoading = false;
        console.log(task);
        this.processId = task.id;
        this.results = JSON.stringify(task);
        timer(1000).subscribe(x => {
          this.getFormTask();
        });
        
        // this.bShowTaskForm = true;
      },
      error =>{ 
        console.error("-------------- *************** Error starting proc with cloud service");
        this.bIsLoading = false;
        this.results = 'Error starting proc';
        this.bShowResults = true;
        }
    );   
  }

  // ***********************************************************
  //  User Task Form functions
  // ***********************************************************
  getFormTask() {
    // console.debug("********************************** " + this.globalValues.appName);

     var _formTaskQuery:TaskQueryCloudRequestModel = new TaskQueryCloudRequestModel();
    //  console.debug("-------------------------------- " + this.globalValues.appName);     
     _formTaskQuery.appName = this.globalValues.appName;
     _formTaskQuery.processInstanceId = this.processId;
     _formTaskQuery.name = this.globalValues.fnolUploadTaskName;

    

    console.log("============================================ begin getFormTask");
    this._taskListCloudService.getTaskByRequest(_formTaskQuery)
      .pipe(map(task => task.list.entries[0] ))
        .subscribe(
          (task) => {
          this.bIsLoading = false;
          console.debug("******************************** form taskid:".concat(task.id));
          this.formTaskId = task.id;
          this.bShowTaskForm = true;
          // this.results = JSON.stringify(task);
          // this.bShowResults = true;
          },
          error => {
            console.error("-------------- *************** Error searching for user task from process: ".concat(this.processId));
            this.bIsLoading = false;
            this.results = 'Error search for user task from process:'.concat(this.processId);
            this.bShowResults = true;
          }
        );
    // 

  }

  taskFormCompleted() {
    this.bShowTaskForm = false;
    alert("Claim documents submitted for review.");
    this._router.navigateByUrl('/home');
  }
  
  taskFormCancel(event: string) {
    console.debug("======================== User cancelled form. Event returned:".concat(event));

    // TODO: Need to cancel / delete parent Process  (this.processId)
    this.bShowTaskForm = false;
    this._router.navigateByUrl('/');
  }

  taskFormError(event: any) {
    console.error("************ Task Form ERROR: ".concat(event));
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
