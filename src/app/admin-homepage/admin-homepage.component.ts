import { Component, OnInit } from "@angular/core";
import { EventService } from "../service/event.service";
import { throwError } from "rxjs";
import { ModalService } from "../_modal/modal.service";
import { LoginService } from "../service/login.service";
import { MyEvent } from "../interface/events/event";
import { StringManipulationService } from "../service/string-manipulation.service";
import { Reminder } from "../interface/events/Reminder";
import { TasksComponent } from "../tasks/tasks.component";

@Component({
  selector: "app-admin-homepage",
  templateUrl: "./admin-homepage.component.html",
  styleUrls: ["./admin-homepage.component.css"],
})
export class AdminHomepageComponent implements OnInit {
  eventList: MyEvent[];
  displayMsg: String;
  displayTitle: String;
  currentPage = 1;
  itemsPerPage = 5;
  pageSize: number;

  constructor(
    private eventService: EventService,
    private modalService: ModalService,
    private loginService: LoginService,
    private stingModify: StringManipulationService
  ) {}

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  ngOnInit() {
    this.loadAllEvents();
  }

  public getDate(rawString: String): String {
    return this.stingModify.modifyDate(rawString);
  }

  public showPopup(title: String, content: String) {
    this.displayMsg = content;
    this.displayTitle = title;
    this.modalService.open("admin-page-errorbox");
  }

  public hidePopup() {
    this.modalService.close("admin-page-errorbox");
  }

  private checkAuthDetails() {
    if (!this.loginService.isValidSession()) {
      this.showPopup("Invalid session", "Try to login again - invalid session");
      this.loginService.redirectToLoginPage();
    }
  }

  public getReminderContent(reminders: Reminder[]): String {
    var result: String = new String();
    if (reminders === null) {
      return "";
    } else {
      result.concat("<table>");
      reminders.forEach((element) => {
        result.concat(
          "<tr><td>" +
            element.reminderCnt +
            "</td><td>" +
            element.reminderTime +
            "</td></tr>"
        );
      });
      result.concat("</table>");
      console.log(result);
      return result;
    }
  }

  loadAllEvents() {
    this.eventService
      .getAllActiveEvents()
      .then((data) => {
        if (data) {
          this.eventList = data.object;
          console.log(JSON.stringify(data));
        }
        /*this.showPopup(
          "Success",
          "Data loaded successfully !" + JSON.stringify(data.object)
        );*/
      })
      .catch((error) => {
        this.showPopup(
          "Error",
          "Internal server error" + JSON.stringify(error)
        );
        throwError("Error while obtaining the events");
      });
  }
}
