import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { CommonService } from "./common.service";
import { Environment } from "../interface/environment";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { MyEvent } from '../interface/events/event';

@Injectable({
  providedIn: "root",
})
export class EventService extends CommonService {
  private getAllEventURL = Environment.baseUrl + "api/getEvents";
  private getEventTypeURL = Environment.baseUrl + "api/getEventTypes";
  private postEventData = Environment.baseUrl + "api/admin/addNewEvent";

  constructor(private http: HttpClient, router: Router) {
    super(router);
  }

  public getAllActiveEvents(): Promise<any> {
    console.log("Making a HTTP request:" + this.getAllEventURL);
    return this.http
      .get(this.getAllEventURL, {
        headers: this.getAuthHeader(),
      })
      .toPromise()
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status == 403) {
            this.clearLocalSessionStorage();
            this.redirectToLoginPage();
          }
        }
      });
  }

  public getEventTypes(): Promise<any> {
    console.log("trying to get the event types");
    return this.http
      .get(this.getEventTypeURL, {
        headers: this.getAuthHeader(),
      })
      .toPromise()
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status == 403) {
            this.clearLocalSessionStorage();
            this.redirectToLoginPage();
          }
        }
      });
  }

  public addNewEvent(event: MyEvent): Promise<any> {
    console.log("Trying to create a new event");
    return this.http
      .put(this.postEventData, JSON.stringify(event), {
        headers: this.getAuthHeader(),
      })
      .toPromise()
      .catch((error) => {
        console.log("Error while adding event.");
        if (error instanceof HttpErrorResponse) {
          if (error.status == 403) {
            console.log("forbidden error !");
          }
        }
      });
  }
}
