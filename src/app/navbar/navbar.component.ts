import { Component, OnInit } from "@angular/core";
import { LoginService } from "../service/login.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: Observable<boolean>;
  isAdminUserObj: Observable<boolean>;

  constructor(private loginService: LoginService) {
    this.isLoggedIn = loginService.isLoggedIn();
    this.isAdminUserObj = loginService.isAdminUserCheck();
  }

  ngOnInit() {}

  public logoutUser() {
    console.log("Trying to logout the user.");
    this.loginService.logoutUser();
  }

  public isAdminUser(): boolean {
    console.log("Checking if the user is admin user.");
    var jwtToken = localStorage.getItem("token");
    return this.loginService.isAdminUser(jwtToken);
  }

  public isUserLoggedIn(): boolean {
    console.log("Check if the user is logged in already");
    return this.loginService.isValidSession();
  }
}
