import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';


interface Task {
  title: string;
  description: string;
  deadline: string;
  priority: string;
  isComplete: boolean;
}

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: Task[] = [];
  displayedColumns: string[] = ['task', 'description', 'deadline', 'priority', 'isComplete', 'action'];

  constructor(public dialog: MatDialog, private toastr: ToastrService) {}

  openDialog(task: Task | null): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(task){
          const index = this.tasks.findIndex(t => t.title === task.title);
          if(index >= 0){
            this.tasks = [
              ...this.tasks.slice(0, index),
              result,
              ...this.tasks.slice(index + 1)
            ];
            this.toastr.success('Task updated successfully!');
          }
        } 
        else {
          this.tasks = [...this.tasks, result];
          this.toastr.success('Task added successfully!');
        }
      }
    });
  }

  deleteTask(task: Task): void {
    this.tasks = this.tasks.filter(t => t !== task);
    this.toastr.success('Task deleted successfully!');
  }
}
