import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard-button',
  templateUrl: './dashboard-button.component.html',
  styleUrls: ['./dashboard-button.component.scss'],
})
export class DashboardButtonComponent implements OnInit {

  @Input() icon: string;
  @Input() title: string;
  constructor() { }
  ngOnInit() {}

}
