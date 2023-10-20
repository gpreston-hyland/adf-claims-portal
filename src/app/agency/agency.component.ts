import { Component, OnInit } from '@angular/core';
import { AgencyService } from '../services/agency.service';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit {

  constructor(
      private agencyService: AgencyService
    ) { }

  ngOnInit(): void {
  }

}
