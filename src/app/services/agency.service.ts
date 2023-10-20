import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  baseURL:string = 'http://ec2-18-206-218-27.compute-1.amazonaws.com:4000/agency';
  
  constructor(
    private http: HttpClient
  ) { }
}
