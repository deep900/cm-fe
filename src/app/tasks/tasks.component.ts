import { Component, OnInit } from "@angular/core";
import { TaskService } from "../service/task.service";
import { Task } from "../interface/task/task";
import { LoginService } from "../service/login.service";
import { EditTaskComponent } from "./edit-task/edit-task.component";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
})
export class TasksComponent implements OnInit {
  taskList: any;
  currentPage = 1;
  itemsPerPage = 5;
  pageSize: number;
  editTaskBaseUrl = "http";

  constructor(
    private taskService: TaskService,
    private loginService: LoginService
  ) {}

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  ngOnInit() {
    if (this.isAdminUser()) {
      console.log("trying to get all the tasks for the admin user.");
      this.getAllTasks();
    } else {
      this.getAllTaskOfUser();
    }
  }

  private isAdminUser() {
    return this.loginService.checkAdminUser();
  }

  getAllTasks() {
    this.taskService
      .getAllTasks()
      .then((data) => {
        this.taskList = data.object;
        console.log(this.taskList);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  }

  getAllTaskOfUser() {
    var emailAddress = this.taskService.getLoggedInUser();
    console.log("Trying to get the task details of the user:" + emailAddress);
    this.taskService
      .getTasksForUser(emailAddress)
      .then((data) => {
        this.taskList = data.object;
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  }
}
