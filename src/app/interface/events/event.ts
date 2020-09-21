import { ReOccurance } from "./ReOccurance";
import { Reminder } from "./Reminder";

export class MyEvent {
  Id: String;
  eventName: String;
  startTime: String;
  endTime: String;
  eventType: String;
  eventStatus: String;
  reOccurance: ReOccurance;
  reminders: Reminder[];
  taskGenerated: boolean;
  remarks: String; 

  constructor(
    eventN: String,
    startT: String,
    eventTy: String,
    remark:String
  ) {
    this.eventName = eventN;
    this.startTime = startT;
    this.eventType = eventTy;    
    this.remarks = remark;
  }
}
