import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

import {GlobalValuesService} from '../services/global-values.service';
import { ProcessInstanceCloud } from '@alfresco/adf-process-services-cloud';

@Component({
  selector: 'app-start-claim',
  templateUrl: './start-claim.component.html',
  styleUrls: ['./start-claim.component.scss']
})
export class StartClaimComponent implements OnInit {

  showUploads: boolean = false;

  constructor(public globalValues:GlobalValuesService
      , private _router:Router
    ) { }

  ngOnInit(): void {
  }

  processCancel() {
    this.showUploads = false;
    this._router.navigateByUrl('/home');

  }
  processSuccess(event: ProcessInstanceCloud) {
    console.log(event);
    this.showUploads = false;
    this._router.navigateByUrl('/home')
  }
}
