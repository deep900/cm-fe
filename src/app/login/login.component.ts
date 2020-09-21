import { Component, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { LoginService } from "../service/login.service";
import { Router } from "@angular/router";
import { timeout } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  title: String = "Login";
  authToken: String;
  errorMsg: String;
  dashboardPage: String = "/dashboard";

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}
  loginForm = this.formBuilder.group({
    emailAddress: [],
    password: [],
  });
  ngOnInit() {
    this.loginService.loadSessionData3();
  }

  clearForm() {
    this.loginForm.get("emailAddress").setValue("");
    this.loginForm.get("password").setValue("");
    this.errorMsg = null;
  }

  private checkSession() {
    var session = localStorage.getItem("sessionId");
    if (!session) {
      var sessionId = this.loginService.loadSessionData1();
      console.log(sessionId);
    }
  }

  loginUser() {
    this.checkSession();
    var email: String = this.loginForm.get("emailAddress").value;
    var password: String = this.loginForm.get("password").value;
    this.loginService.loginUserVer2(email, password).then((response) => {
      var jwtToken = null;
      if (response && response.object && response.object.securityToken) {
        jwtToken = response.object.securityToken;
        localStorage.setItem("token", jwtToken.toString());
        this.loginService.isAuthenticated.next(true);
        this.loginService.isAdminUserOb.next(this.loginService.checkAdminUser());
      }
      console.log(this.loginService.isAdminUser(jwtToken));
      if (jwtToken) {
        this.handlePostLogin(true,jwtToken,email);
      } else {
        this.handlePostLogin(false,jwtToken,email);
      }
    });
  }

  

  handlePostLogin(flag: boolean, jwtToken: String,emailAddress:String) {
    console.log("Handling post login method " + flag);
    if (!flag) {
      this.errorMsg = "Login failed - Check the credentials";
      console.log("Login failed");
    } else {
      var isAdmin: boolean = this.loginService.isAdminUser(jwtToken);
      localStorage.setItem("email",emailAddress.toString());
      this.errorMsg = null;
      if (isAdmin) {
        this.router.navigate(["admin-dashboard"]);
        console.log("--Admin dashboard --");
        return;
      }
      this.router.navigate(["dashboard"]);
      console.log("routing to regular dashboard");
    }
  }
}
