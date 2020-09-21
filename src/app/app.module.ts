import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { EventsComponent } from "./events/events.component";
import { TasksComponent } from "./tasks/tasks.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HomepageComponent } from "./homepage/homepage.component";
import { LoginService } from "./service/login.service";
import { HttpClientModule } from "@angular/common/http";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AdminHomepageComponent } from "./admin-homepage/admin-homepage.component";
import { ModalModule } from "./_modal/modal.module";
import { AddEventComponent } from "./events/addEvent/add-event/add-event.component";
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EventsComponent,
    TasksComponent,
    NavbarComponent,
    FooterComponent,
    HomepageComponent,
    DashboardComponent,
    AdminHomepageComponent,
    AddEventComponent,
    EditTaskComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule,
    NgbModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
