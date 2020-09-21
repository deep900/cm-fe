import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  constructor(private router: Router) {}

  jwtHelper = new JwtHelperService();

  public clearLocalSessionStorage() {
    localStorage.clear();
  }

  public redirectToLoginPage() {
    this.clearLocalSessionStorage();
    this.router.navigate(["login"]);
  }

  public getLoggedInUser():String{
    return localStorage.getItem("email");
  }

  public getAuthHeader() {
    var authHeader = localStorage.getItem("token");
    var sessionIdVar = localStorage.getItem("sessionId");
    console.log(
      "Loading headers : Auth header:" +
        authHeader +
        ",session id:" +
        sessionIdVar
    );
    if (authHeader != null) {
      const headers = new HttpHeaders()
        .set("content-type", "application/json")
        .set("Authorization", authHeader)
        .set("sessionId", sessionIdVar);
      return headers;
    } else {
      console.log("Unable to find the auth header");
      this.clearLocalSessionStorage();
      this.redirectToLoginPage();
    }
  }

  public isTokenAlive() {
    var token = localStorage.getItem("token");
    if (token == null) {
      return false;
    }
    if (this.jwtHelper == null) {
      console.log("No jwt helper available.");
    }
    if (this.jwtHelper.isTokenExpired(token)) {
      return false;
    } else {
      return true;
    }
  }
}
