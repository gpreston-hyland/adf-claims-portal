import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { ApolloModule } from 'apollo-angular';

// ADF modules
import { ContentModule } from '@alfresco/adf-content-services';
import { ProcessServicesCloudModule, StartProcessCloudService, ProcessTaskListCloudService } from '@alfresco/adf-process-services-cloud';
import { CoreModule, TRANSLATION_PROVIDER, TranslateLoaderService } from '@alfresco/adf-core';

// Custom stencils
import { StencilsModule } from './stencils.module';

// App components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppsComponent } from './apps/apps.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { StartProcessComponent } from './start-process/start-process.component';
import { FileViewComponent } from './file-view/file-view.component';
import { BlobViewComponent } from './file-view/blob-view.component';
import { PreviewService } from './services/preview.service';
import {SubmitDialogComponent} from './submit-dialog/submit-dialog.component';


import { appRoutes } from './app.routes';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { DocumentsComponent } from './documents/documents.component';
import { GlobalValuesService} from './services/global-values.service';
import { StartClaimComponent } from './start-claim/start-claim.component';
import { MyProcessCloudService } from './services/my-process-cloud.service';
import { AgencyComponent } from './agency/agency.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatIconModule,
        RouterModule.forRoot(appRoutes // ,
// { enableTracing: true } // <-- debugging purposes only
, { relativeLinkResolution: 'legacy', enableTracing: true }),

        // ADF modules
        CoreModule.forRoot(),
        ContentModule.forRoot(),
        ProcessServicesCloudModule.forRoot(),
        TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateLoaderService }
        }),
        StencilsModule,
        ApolloModule,
        MatDialogModule
    ],
    declarations: [
        AppComponent,
        AppsComponent,
        HomeComponent,
        LoginComponent,
        TasksComponent,
        TaskDetailsComponent,
        StartProcessComponent,
        AppLayoutComponent,
        BlobViewComponent,
        FileViewComponent,
        DocumentsComponent,
        StartClaimComponent,
        SubmitDialogComponent,
        AgencyComponent
    ],
    providers: [
        PreviewService,
        GlobalValuesService,
        StartProcessCloudService,
        ProcessTaskListCloudService,
        MyProcessCloudService,
        {
            provide: TRANSLATION_PROVIDER,
            multi: true,
            useValue: {
                name: 'app',
                source: 'resources'
            }
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
