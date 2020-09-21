import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StringManipulationService {
  constructor() {}

  public modifyDate(rawString: String): String {
    if (rawString.indexOf("T") > 0) {
      return rawString.substring(0, rawString.indexOf("T"));
    } else {
      return rawString;
    }
  }
}
