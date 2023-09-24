import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {map} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import {GlobalValuesService} from '../services/global-values.service';
import {MyProcessCloudService} from '../services/my-process-cloud.service';

import { ProcessInstanceCloud, ProcessInstanceVariable, ProcessPayloadCloud, StartProcessCloudService,
         TaskListCloudService, ProcessTaskListCloudService,
         TaskQueryCloudRequestModel} from '@alfresco/adf-process-services-cloud';
import { timer } from 'rxjs';
import {poll} from 'poll';

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
  createProcId:string;
  processId: string;
  formTaskId: string;
  bTaskComplete:boolean = false;
  results:any ;

  constructor(public globalValues:GlobalValuesService
      ,private _router:Router
      ,private _startProcCloud:StartProcessCloudService
      ,private _procCloudService:MyProcessCloudService
      ,private _taskListCloudService:TaskListCloudService
      ,private _processTaskListCloudService:ProcessTaskListCloudService
      ,private http:HttpClient
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

    //let _payload: ProcessPayloadCloud = new ProcessPayloadCloud();
    
    // TODO: call create claim folder process
    // see https://stackoverflow.com/questions/22125865/how-to-wait-until-a-predicate-condition-becomes-true-in-javascript
    // --- which lead to npm package 'poll' (eventually)
    // to monitor for task completion before moving on

    let _payload: ProcessPayloadCloud = new ProcessPayloadCloud( {
      name: "Create or Get ClaimFolder",
      processDefinitionKey: this.globalValues.mvp_genClaimStructureId,
      variables: {"companyName": "GP LLC"}
    });
    this.globalValues.claimNumber="not set";

    console.debug("=========================start folder create _payload:", _payload);
    this._startProcCloud.startProcess(this.globalValues.mvp_AppName,_payload).subscribe((task:ProcessInstanceCloud) => {
      console.log(">>>>>>>>>>>>>>>>>>>>> create folder task",task," ID:", task.id);
      this.createProcId = task.id;
      timer(1000).subscribe(_x => {

        console.debug("========================= call get process vars");
        // getProcessInstanceById doesn't populate the variables (ProcessInstanceVariable[]) from ProcessInstanceCloud type!
        // this._procCloudService.getProcessInstanceById("claims-comm-auto-mvp",this.createProcId).subscribe ((inst:ProcessInstanceCloud)=> {
        this._procCloudService.getProcessInstanceVariablesById(this.globalValues.mvp_AppName,this.createProcId).subscribe ((vars:any[])=> {
          console.debug(">>>>>>>>>>>>>>>>>>> get process vars by id return:", vars);

          for(let v of vars) {
            // console.log(v,":", typeof(v));
            if(v.entry.name == "claimId") { this.globalValues.claimNumber = v.entry.value; }
            else if(v.entry.name == "claimFolderName") { this.globalValues.claimFolderName = "-root-".concat(v.entry.value); }
          }
          console.debug(">>>>>>>>>>>>>>>>>>>>> extracted variables: ", this.globalValues.claimNumber,":",this.globalValues.claimFolderName);
          
          // Setup for call to 'FNOL' process
          _payload = new ProcessPayloadCloud ({
            processDefinitionKey: this.globalValues.ct_testGatewaysId,
            name: this.globalValues.fnolProcess.concat("-",this.globalValues.currentUser,"-",this.globalValues.claimNumber),
            variables: {
              claimId:this.globalValues.claimNumber,
              companyName:this.globalValues.companyName, 
              claimFolderName:this.globalValues.claimFolderName
            }
          });
  
          console.debug("========================= start FNOL _payload:", _payload);
          this._startProcCloud.startProcess(this.globalValues.appName,_payload).subscribe((task:ProcessInstanceCloud) => {
            console.log(">>>>>>>>>>>>>>>>> start FNOL task:", task);
            this.processId = task.id;
            timer(1000).subscribe(x => {
              this.getFormTask();
            });
          });
        });
      });  
    });
 
  }


  // ***********************************************************
  //  User Task Form functions
  // ***********************************************************
  getFormTask() {
    // console.debug("********************************** " + this.globalValues.appName);

     let _formTaskQuery:TaskQueryCloudRequestModel = new TaskQueryCloudRequestModel({
      appName: this.globalValues.ct_AppName,
      processInstanceId: this.processId,
      name: this.globalValues.fnolUploadTaskName
     });

    //  console.debug("-------------------------------- " + this.globalValues.appName);     
    //  _formTaskQuery.appName = this.globalValues.appName;
    //  _formTaskQuery.processInstanceId = this.processId;
    //  _formTaskQuery.name = this.globalValues.fnolUploadTaskName;

    

    console.log("============================================ begin getFormTask queryPayload:", _formTaskQuery);
    this._processTaskListCloudService.getTaskByRequest(_formTaskQuery)
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
