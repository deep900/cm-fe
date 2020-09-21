import { Component, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EventService } from "src/app/service/event.service";
import { CommonService } from "src/app/service/common.service";
import { Router } from "@angular/router";
import { MyEvent } from "../../../interface/events/event";
import { ReOccurance } from "src/app/interface/events/ReOccurance";
import { Reminder } from "src/app/interface/events/Reminder";

@Component({
  selector: "app-add-event",
  templateUrl: "./add-event.component.html",
  styleUrls: ["./add-event.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class AddEventComponent extends CommonService {
  eventTypeList: String[] = [];
  frequencyTypeList: String[] = ["Daily", "Fortnight", "Monthly", "Yearly"];
  occurancesList: String[] = [];
  endDateDisplay: boolean = false;
  selectedReoccurance: String = "Yearly";
  selectedFrequency: String = "1";
  minDate = new Date();
  myRouter: Router;

  eventobj: MyEvent;
  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    router: Router
  ) {
    super(router);
    this.myRouter = router;
  }

  addEventForm: FormGroup = this.fb.group({
    eventName: [, [Validators.required, Validators.minLength(3)]],
    startTime: [, Validators.required],
    endTime: [],
    eventType: [, Validators.required],
    frequencyType: [],
    numberOfOccurance: [],
  });

  ngOnInit() {
    this.prepareViewForAddEvent();
    this.initializeEventType();
    this.initOccuranceList();
  }

  private prepareViewForAddEvent() {
    if (!this.isTokenAlive) {
      this.redirectToLoginPage();
    }
  }

  private initOccuranceList() {
    console.log("Initializing the occurance list");
    for (let index = 1; index < 100; index++) {
      this.occurancesList.push(index.toString());
    }
  }

  onOptionsSelected(value: String): void {
    console.log(value);
    if (value === "BirthdayEvent" || value === "WeddingAnniversary") {
      this.endDateDisplay = false;
      this.selectedReoccurance = "Yearly";
    } else {
      this.endDateDisplay = true;
      this.selectedReoccurance = "";
    }
  }

  private initializeEventType() {
    this.eventService
      .getEventTypes()
      .then((data) => {
        this.eventTypeList = data.object;
        console.log(this.eventTypeList);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  canDisplayEndDate() {
    return this.endDateDisplay;
  }

  getReOccurance() {
    var freqType = this.addEventForm.get("frequencyType").value;
    var numOfOcc = this.addEventForm.get("numberOfOccurance").value;
    console.log(
      "Frequency type " + freqType + ", Number of occurance:" + numOfOcc
    );
    return new ReOccurance(freqType, numOfOcc);
  }

  getReminder() {
    var reminders: Reminder[] = [];
    var reminderObj = new Reminder(1, this.getStartTime());
    reminders.push(reminderObj);
    return reminders;
  }

  getDay() {
    return this.addEventForm.get("startTime").value.day;
  }

  getMonth() {
    var month: String;
    if (this.addEventForm.get("startTime").value.month < 10) {
      month = "0" + this.addEventForm.get("startTime").value.month;
    } else {
      month = this.addEventForm.get("startTime").value.month;
    }
    return month;
  }

  getYear() {
    return this.addEventForm.get("startTime").value.year;
  }

  getStartTime() {
    return (
      this.getYear() + "-" + this.getMonth() + "-" + this.getDay() + " 00:00:00"
    );
  }

  onSubmit() {
    console.log(this.addEventForm.value);
    var remark = this.addEventForm.get("eventName").value;
    var startTime = this.getStartTime();
    var eventType = this.addEventForm.get("eventType").value;
    var eventNameS = "";
    if (eventType == "BirthdayEvent") {
      eventNameS = "birthday-greeting";
    } else if (eventType == "WeddingAnniversary") {
      eventNameS = "wedding-aniversary-greeting";
    }
    console.log(startTime);
    this.eventobj = new MyEvent(eventNameS, startTime, eventType, remark);
    this.eventobj.reOccurance = this.getReOccurance();
    this.eventobj.reminders = this.getReminder();

    this.eventService
      .addNewEvent(this.eventobj)
      .then((data) => {
        console.log(data);
        this.routeToAdminHomePage();
      })
      .catch((error) => {
        JSON.stringify(error);
      });
  }

  private routeToAdminHomePage() {
    this.myRouter.navigate(["admin-dashboard"]);
  }
}
