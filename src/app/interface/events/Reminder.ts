export class Reminder {
  reminderCnt: Number;
  reminderTime: String;
  active:boolean;

  constructor(reminderCntObj: Number, remindTime: String) {
    this.reminderCnt = reminderCntObj;
    this.reminderTime = remindTime;
    this.active = true;
  }
}
