import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SpaceXLaunchDetails } from '../models/launch-models';
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  appliedYear: string;
  isLaunched: string;
  isLanded: string;
  recordLimit: number;
  launchList: SpaceXLaunchDetails[] = [];

  /**
   *  Dashboard module related services.
   *  Current route.
   *  Router for navigation.
   */
  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * Completing the mandatory actions on component initialization.
   */
  ngOnInit() {
    this.getQueryParameters();
  }

  /**
   * Get all Parameters from URI
   */
  getQueryParameters() {
    this.recordLimit = 50;
    this.route.queryParamMap.subscribe((params) => {
      this.appliedYear = params.get('year');
      this.isLanded = params.get('landSucess');
      this.isLaunched = params.get('launchSucess');
      this.fetLaunches();
    });
  }

  /**
   * Action from child component for select/deselect the years.
   * contains property to update and the selection property.
   */
  applyFilters(payload) {
    this.genericFilter(payload);
  }

  /**
   * Updating the filter which is been sent from child component.
   * Navigate to a new page.
   * contains which property to update and the selection property.
   */
  genericFilter(payload) {
    this[payload.propertyName] = payload.selection.isSelected
      ? payload.selection.value
      : undefined;
    this.goToFiltersPage();
    this.fetLaunches();
  }

  /**
   * Navigate to the new page to play around with the filters.
   */
  goToFiltersPage() {
    this.router.navigate(['/filter'], {
      queryParams: {
        year: this.appliedYear,
        launchSucess: this.isLaunched,
        landSucess: this.isLanded,
      },
    });
  }

  /**
   * Fetching the list of spacex launches.
   */
  fetLaunches() {
    this.dashboardService
      .getLaunches(
        this.appliedYear,
        this.isLaunched,
        this.isLanded,
        this.recordLimit
      )
      .subscribe((data: SpaceXLaunchDetails[]) => (this.launchList = data));
  }
}
 