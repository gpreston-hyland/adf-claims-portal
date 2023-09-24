import { Injectable } from "@angular/core";
import {ProcessCloudService, ProcessInstanceCloud, ProcessInstanceVariable} from "@alfresco/adf-process-services-cloud";
//import { LogService } from "@alfresco/adf-core";
import { Observable } from "rxjs";
import {map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})



export class MyProcessCloudService extends ProcessCloudService {

    getProcessInstanceVariablesById(appName: string, processInstanceId: string): Observable<ProcessInstanceVariable[]> {
        if (appName && processInstanceId) {
            const url = `${this.getBasePath(appName)}/query/v1/process-instances/${processInstanceId}/variables`;
            // let vars:ProcessInstanceVariable[] = [];
            // console.log( this.get<any>(url).pipe(
            //     map((res) => res.list.entries))) ;  

            return this.get<any>(url).pipe(
                map((res) => res.list.entries)) ;      
            
        } else {
            console.error('AppName and ProcessInstanceId are mandatory for querying a process');
            // return throwError('AppName/ProcessInstanceId not configured');
        }        
    }
    
}

interface EmbeddedResponse {
    _embedded: {
        variables: ProcessInstanceVariable[]
    }
}