import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styles: [` :host { display: block; } `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminHomeComponent implements OnInit {

  pageTitle = 'Dashboard';

  constructor() { }

  ngOnInit(): void {
  }

}
