import { Reminder } from "../events/Reminder";

export class Task {
  id: String;
  eventId: String;
  taskName: String;
  startTime: String;
  estimatedHours: Number;
  presentState: String;
  taskSequence: Number;
  reminders: Reminder[];
  childTasks: String[];
  asignee:String;
  comments:String[];
}
