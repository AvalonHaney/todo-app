import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-dialog',
  standalone: false,
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.taskForm = this.fb.group({
      title: [data ? data.title : '', [Validators.required]],
      description: [data ? data.description : '', [Validators.required]],
      deadline: [data ? data.deadline : '', [Validators.required]],
      priority: [data ? data.priority : '', [Validators.required]],
      isComplete: [data ? data.isComplete : false]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if(this.taskForm.valid){
      this.dialogRef.close(this.taskForm.value);
    }
  }
}
