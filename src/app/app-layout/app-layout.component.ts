import { Component } from '@angular/core';
import {GlobalValuesService} from '../services/global-values.service';

@Component({
  selector: 'app-root',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent {
  constructor (public globalValues:GlobalValuesService) {};
}
