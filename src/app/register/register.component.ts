import { Component, OnInit } from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  constructor(private formBuilder: FormBuilder) { }

  registrationForm = this.formBuilder.group({
   firstName:[],
   lastName:[],
   emailAddress:[],
   phone:[]        
  });
  ngOnInit() {
  }

}
