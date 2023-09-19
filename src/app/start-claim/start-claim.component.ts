import { Component, OnInit } from '@angular/core';

import {GlobalValuesService} from '../services/global-values.service';

@Component({
  selector: 'app-start-claim',
  templateUrl: './start-claim.component.html',
  styleUrls: ['./start-claim.component.scss']
})
export class StartClaimComponent implements OnInit {

  
  constructor(public globalValues:GlobalValuesService) { }

  ngOnInit(): void {
  }

}
