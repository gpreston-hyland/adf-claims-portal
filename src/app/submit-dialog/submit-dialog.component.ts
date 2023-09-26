import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-submit-dialog',
  templateUrl: './submit-dialog.component.html',
  styleUrls: ['./submit-dialog.component.scss']
})
export class SubmitDialogComponent{

  claimNumber:string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data:any,
    private dialogRef: MatDialogRef<SubmitDialogComponent>)
  { 
    if(data) {
      this.claimNumber = data.claimNumber;
    }
  }

  onCloseClick() {
    this.dialogRef.close();
  }

}
