import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { UsersService } from './auth/services/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.initUserDb();
  }

}
