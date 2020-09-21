import { Component, OnInit, Input } from "@angular/core";
import { TaskService } from "src/app/service/task.service";
import { Task } from "src/app/interface/task/task";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: "app-edit-task",
  templateUrl: "./edit-task.component.html",
  styleUrls: ["./edit-task.component.css"],
})
export class EditTaskComponent implements OnInit {
  constructor(private taskService: TaskService,private fb:FormBuilder) {}

  @Input() parentTaskId:String;  
  taskData: Task;

  editTaskForm = this.fb.group({
    comment:[Validators.required],    
    presentState:[Validators.required],
  });

  ngOnInit() {
    this.loadTaskData();
  }

  loadTaskData() {
    this.taskService
      .fetchTask(this.parentTaskId)
      .then((data) => {
        this.taskData = data;
      })
      .catch((error) => {
        console.log("Error while fetching the data:" + JSON.stringify(error));
      });
  }
}
