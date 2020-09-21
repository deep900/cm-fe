import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { EventsComponent } from "./events/events.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AdminHomepageComponent } from "./admin-homepage/admin-homepage.component";
import { AddEventComponent } from "./events/addEvent/add-event/add-event.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "events", component: EventsComponent },
  { path: "", component: HomepageComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "admin-dashboard", component: AdminHomepageComponent },
  { path: "addEvent", component: AddEventComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  LoginComponent,
  RegisterComponent,
  EventsComponent,
  HomepageComponent,
  DashboardComponent,
  AdminHomepageComponent,
  AddEventComponent,
];
