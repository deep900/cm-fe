import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { sha512 } from "../../../node_modules/js-sha512";
import { IAuthResponse } from "src/app/interface/Auth/auth.response";
import { SessionResponse } from "src/app/interface/Auth/session.response";
import { JwtHelperService } from "@auth0/angular-jwt";
import { CommonService } from "./common.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class LoginService extends CommonService {
  url = "http://localhost:8080/api/authenticateReq";
  preLoginUrl = "http://localhost:8080/api/prepareForLogin";
  logoutUrl = "http://localhost:8080/api/logout";
  requestBody: String;
  header: any;
  sessionIdData: SessionResponse;
  authResponse: IAuthResponse;
  isAuthenticated = new BehaviorSubject<boolean>(this.checkLogin());
  isAdminUserOb = new BehaviorSubject<boolean>(this.checkAdminUser());

  public isLoggedIn() {
    return this.isAuthenticated.asObservable();
  }

  public isAdminUserCheck(){
    return this.isAdminUserOb.asObservable();
  }

  constructor(private http: HttpClient, router: Router) {
    super(router);
  }

  public prepareForLogin(): Observable<SessionResponse> {
    return this.http.get<SessionResponse>(this.preLoginUrl);
  }

  public logoutUser(): Observable<SessionResponse> {
    console.log("Printing * the logout URL:" + this.logoutUrl);
    localStorage.clear();
    this.isAuthenticated.next(false);
    return this.http.get<SessionResponse>(this.logoutUrl, {
      headers: this.getAuthHeader(),
    });
  }

  private getSessionHeader() {
    this.header = localStorage.getItem("sessionId");
    if (this.header == null) {
      throwError("Unable to find the session header ");
      this.loadSessionData3();
    }
    const headers = new HttpHeaders()
      .set("content-type", "application/json")
      .set("sessionId", this.header);
    return headers;
  }

  private hashPassword(password: String): any {
    const sessionIdVar: String = localStorage.getItem("sessionId");
    if (sessionIdVar == null) {
      console.log("Session id not found !");
      return null;
    }
    var hash = sha512.create();
    hash.update(password.toString());
    return hash.hex();
  }

  public loadSessionData3() {
    var sessionid = this.loadSessionData2().then((response) => {
      var ss = response.object.sessionId;
      console.log(ss);
      localStorage.setItem("sessionId", ss.toString());
    });
  }

  loginUserVer2(emailaddress: String, password: String): Promise<any> {
    const reqBody = this.getRequestBody(emailaddress, password);
    return this.http
      .post<IAuthResponse>(this.url, reqBody, {
        headers: this.getSessionHeader(),
      })
      .toPromise()
      .catch((error) => {
        throwError("Server Error occured !" + JSON.stringify(error));
      });
  }

  public loadSessionData1(): String {
    console.log("inside load session data 1");
    var sessionId = "";
    this.loadSessionData2()
      .then((response) => {
        console.log(response);
        if (response && response.object && response.object.sessionId) {
          sessionId = response.object.sessionId.toString();
          console.log(sessionId);
          localStorage.setItem("sessionId", sessionId.toString());
          return sessionId;
        }
      })
      .catch((error) => {
        throwError("Server Error occured !" + JSON.stringify(error));
      });
    return sessionId;
  }

  public loadSessionData2(): Promise<SessionResponse> {
    return this.prepareForLogin().toPromise();
  }

  parseJwtToken(token: any): String {
    try {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      console.log(decodedToken);
      return decodedToken;
    } catch (error) {
      console.log("Error while parsing jwt token " + error);
    }
    return "";
  }

  getRequestBody(username: String, password: String) {
    return {
      emailAddress: username,
      password: this.hashPassword(password.toString()),
    };
  }

  public isValidSession(): boolean {
    try {
      var sessionIdVar: String = localStorage.getItem("sessionId");
      var jwtToken = localStorage.getItem("token");
      return sessionIdVar != null && jwtToken != null;
    } catch (error) {
      return false;
    }
  }

  checkLogin() {
    var jwtToken = localStorage.getItem("token");
    if (jwtToken) {      
      return true && !this.jwtHelper.isTokenExpired(jwtToken);
    } else {
      return false;
    }
  }

  checkAdminUser(){
    var jwtToken = localStorage.getItem("token");
    if(jwtToken == null){
      return false;
    }
    else{
      return !this.jwtHelper.isTokenExpired(jwtToken) && this.isAdminUser(jwtToken);
    }
  }

  isTokenExpired(){

  }

  isAdminUser(jwtToken: String): boolean {
    var result: any = this.parseJwtToken(jwtToken);
    if (result && result.ROLES) {
      console.log("Roles" + result.ROLES);
      var adminUser = result.ROLES.split(",").indexOf("ROLE_ADMIN_USER") >= 0;
      console.log(adminUser);
      return adminUser;
    }
    return false;
  }
}
