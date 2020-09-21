import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { CommonService } from "./common.service";
import { Router } from "@angular/router";
import { Environment } from "../interface/environment";

@Injectable({
  providedIn: "root",
})
export class TaskService extends CommonService {
  private getAllTaskURL = Environment.baseUrl + "api/admin/getAllTasks";

  private getTaskForUserURL = Environment.baseUrl + "api/getTasksForUser";

  private fetchTaskURL = Environment.baseUrl + "api/fetchTaskForUser";

  constructor(private http: HttpClient, router: Router) {
    super(router);
  }

  public getAllTasks(): Promise<any> {
    console.log("Trying to get all tasks.");
    return this.http
      .get(this.getAllTaskURL, { headers: this.getAuthHeader() })
      .toPromise()
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          console.log(JSON.stringify(error));
        }
      });
  }

  public getTasksForUser(emailAddress: String): Promise<any> {
    console.log("Trying to fetch the task details for user:" + emailAddress);
    return this.http
      .get(this.getTaskForUserURL + "?email=" + emailAddress, {
        headers: this.getAuthHeader(),
      })
      .toPromise()
      .catch((error) => {
        console.log(
          "Error while obtaining the task for the user !" +
            JSON.stringify(error)
        );
      });
  }

  public fetchTask(taskId: String): Promise<any> {
    console.log("Editing the task id:" + taskId);
    return this.http
      .get(this.fetchTaskURL + "?taskId=" + taskId, {
        headers: this.getAuthHeader(),
      })
      .toPromise()
      .catch((error) => {
        console.log(
          "Error while edditing the state of task" + JSON.stringify(error)
        );
      });
  }
}
