import { Component, OnInit, Input } from '@angular/core';
import { LaunchDetails } from '../models/launch-models';

@Component({
  selector: 'app-launch-list',
  templateUrl: './launch-list.component.html',
  styleUrls: ['./launch-list.component.scss'],
})
export class LaunchListComponent implements OnInit {
  @Input() launchList: LaunchDetails[];

  constructor() {}

  ngOnInit() {}
}
